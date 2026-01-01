# Role Switcher & Feature Visibility System - Recreation Prompt

## Overview

This document provides a comprehensive prompt for recreating the Role Switcher and Feature Visibility system in a clone of the SVP Platform. This system enables:

1. **Role Switcher**: Allows SuperAdmins to temporarily view the platform as any other role
2. **Feature Visibility**: Per-role configuration of which features/navigation items are visible
3. **Role-Based Access Control (RBAC)**: Data filtering based on user roles

---

## Prompt for AI Assistant

```
Create a comprehensive Role Switcher and Feature Visibility system for a Next.js 14+ application with the following specifications:

### 1. USER ROLES

Define the following user roles with hierarchy:
- **SuperAdmin**: Full platform access, can modify all users and settings, can view as any role
- **Admin**: Can see all data, modify users (except SuperAdmin), manage most settings
- **Team Member**: Internal team, can see all projects, create content
- **Affiliate**: External partner, sees only assigned content
- **Consultant**: External consultant, sees only assigned content
- **Customer**: External customer, sees only their own projects
- **Viewer**: Read-only access to assigned content

### 2. ROLE SWITCHER COMPONENT

Create a role switcher in the user profile context that:

a) **State Management**:
   - Add `viewAsRole` state (nullable) to track when SuperAdmin is viewing as another role
   - Add `setViewAsRole` function to change the viewing role
   - Add `getEffectiveRole()` function that returns `viewAsRole` if set, otherwise actual role

b) **UI Component** (in sidebar or header):
   - Only visible to SuperAdmin users
   - Dropdown with all available roles
   - Visual indicator showing current "viewing as" role
   - "Reset to SuperAdmin" option to clear viewAsRole

c) **Implementation in UserProfileContext**:
```tsx
const [viewAsRole, setViewAsRole] = useState<UserRole | null>(null);

const getEffectiveRole = useCallback(() => {
  if (viewAsRole && profile.role === "superadmin") {
    return viewAsRole;
  }
  return profile.role;
}, [viewAsRole, profile.role]);
```

### 3. FEATURE VISIBILITY SYSTEM

Create a Feature Visibility management system:

a) **Data Structure** (stored in Firebase/database):
```typescript
interface FeatureVisibilityByRole {
  [roleId: string]: {
    [featureId: string]: boolean;
  };
}

// Example:
{
  "superadmin": { "Dashboard": true, "Projects": true, "Admin Panel": true },
  "admin": { "Dashboard": true, "Projects": true, "Admin Panel": true },
  "affiliate": { "Dashboard": true, "Projects": true, "Admin Panel": false },
  "viewer": { "Dashboard": true, "Projects": false, "Admin Panel": false }
}
```

b) **Feature Definitions**:
```typescript
interface FeatureDefinition {
  id: string;
  name: string;
  description: string;
  category: "navigation" | "work" | "admin" | "ai" | "initiatives";
  requiresSubscription?: string[];
}

const FEATURES: FeatureDefinition[] = [
  { id: "dashboard", name: "Dashboard", category: "navigation" },
  { id: "projects", name: "Projects", category: "work" },
  { id: "opportunities", name: "Opportunities", category: "work" },
  { id: "customers", name: "Customers", category: "work" },
  { id: "admin-panel", name: "Admin Panel", category: "admin" },
  { id: "team-members", name: "Team Members", category: "admin" },
  { id: "settings", name: "Settings", category: "admin" },
  // ... more features
];
```

c) **Feature Visibility Hook** (`lib/feature-visibility.ts`):
```typescript
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Default visibility settings per role
function getDefaultRoleSettings(role: string): Record<string, boolean> {
  const allFeatures = FEATURES.reduce((acc, f) => ({ ...acc, [f.name]: true }), {});
  
  switch (role) {
    case "superadmin":
    case "admin":
      return allFeatures; // All features visible
    case "team":
      return { ...allFeatures, "Admin Panel": false };
    case "affiliate":
    case "consultant":
      return { 
        "Dashboard": true, 
        "Projects": true, 
        "Opportunities": true,
        // Limited features
      };
    case "viewer":
      return { "Dashboard": true }; // Minimal features
    default:
      return allFeatures;
  }
}

export function useFeatureVisibility(role: string) {
  const [settings, setSettings] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db || !role) return;

    // Listen to Firestore for real-time updates
    const unsubscribe = onSnapshot(
      doc(db, "platformSettings", "featureVisibilityByRole"),
      (snapshot) => {
        const data = snapshot.data();
        const roleSettings = data?.[role] || getDefaultRoleSettings(role);
        setSettings(roleSettings);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [role]);

  const isFeatureVisible = (featureName: string): boolean => {
    return settings[featureName] !== false;
  };

  return { isFeatureVisible, settings, loading };
}
```

### 4. FEATURE VISIBILITY SETTINGS PAGE

Create an admin settings page for managing feature visibility:

a) **UI Components**:
   - Role selector tabs/buttons (one for each role)
   - Feature list grouped by category
   - Toggle switches for each feature per role
   - Quick actions: "Show All", "Hide All", "Reset to Defaults"
   - "Copy from Role" dropdown to copy settings between roles
   - Badge showing enabled count per role (e.g., "24/27")

b) **Save to Firebase**:
```typescript
async function saveFeatureVisibility(roleId: string, features: Record<string, boolean>) {
  await setDoc(
    doc(db, "platformSettings", "featureVisibilityByRole"),
    { [roleId]: features },
    { merge: true }
  );
}
```

### 5. SIDEBAR INTEGRATION

Update the sidebar to filter navigation items based on feature visibility:

```tsx
import { useFeatureVisibility } from "@/lib/feature-visibility";
import { useUserProfile } from "@/contexts/user-profile-context";

function PortalSidebar() {
  const { getEffectiveRole } = useUserProfile();
  const effectiveRole = getEffectiveRole();
  const { isFeatureVisible } = useFeatureVisibility(effectiveRole);

  const filteredNavItems = navItems.filter(item => isFeatureVisible(item.title));
  const filteredWorkItems = workItems.filter(item => isFeatureVisible(item.title));
  const filteredAdminItems = adminItems.filter(item => isFeatureVisible(item.title));

  return (
    <Sidebar>
      {filteredNavItems.map(item => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>{item.title}</Link>
        </SidebarMenuItem>
      ))}
      {/* ... other sections */}
    </Sidebar>
  );
}
```

### 6. ROLE-BASED DATA ACCESS (RBAC)

Create a permissions utility (`lib/role-permissions.ts`):

```typescript
export type UserRole = "superadmin" | "admin" | "team" | "affiliate" | "consultant" | "customer" | "viewer";

export interface RolePermissions {
  canViewAllData: boolean;
  canViewAssignedOnly: boolean;
  canCreateUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canEditSuperAdmin: boolean;
  canChangeUserRoles: boolean;
  canPromoteToSuperAdmin: boolean;
  canManagePlatformSettings: boolean;
  canAccessAdminPanel: boolean;
}

const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  superadmin: {
    canViewAllData: true,
    canViewAssignedOnly: false,
    canCreateUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canEditSuperAdmin: true,
    canChangeUserRoles: true,
    canPromoteToSuperAdmin: true,
    canManagePlatformSettings: true,
    canAccessAdminPanel: true,
  },
  admin: {
    canViewAllData: true,
    canViewAssignedOnly: false,
    canCreateUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canEditSuperAdmin: false, // Cannot edit SuperAdmin
    canChangeUserRoles: true,
    canPromoteToSuperAdmin: false, // Cannot promote to SuperAdmin
    canManagePlatformSettings: true,
    canAccessAdminPanel: true,
  },
  affiliate: {
    canViewAllData: false,
    canViewAssignedOnly: true, // Only sees assigned content
    canCreateUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canEditSuperAdmin: false,
    canChangeUserRoles: false,
    canPromoteToSuperAdmin: false,
    canManagePlatformSettings: false,
    canAccessAdminPanel: false,
  },
  // ... define for other roles
};

// Helper functions
export function getRolePermissions(role: string): RolePermissions {
  return ROLE_PERMISSIONS[role as UserRole] || ROLE_PERMISSIONS.viewer;
}

export function canEditUser(editorRole: string, targetRole: string): boolean {
  const permissions = getRolePermissions(editorRole);
  if (!permissions.canEditUsers) return false;
  if (targetRole === "superadmin") return permissions.canEditSuperAdmin;
  return true;
}

export function filterDataByRole<T>(
  data: T[],
  userRole: string,
  userId: string,
  assignmentField: string = "assignedTo",
  ownerField: string = "ownerId"
): T[] {
  const permissions = getRolePermissions(userRole);
  
  if (permissions.canViewAllData) return data;
  
  if (permissions.canViewAssignedOnly) {
    return data.filter((item: any) => {
      if (item[ownerField] === userId) return true;
      const assigned = item[assignmentField];
      if (Array.isArray(assigned) && assigned.includes(userId)) return true;
      if (item.affiliateId === userId) return true;
      if (item.customerId === userId) return true;
      return false;
    });
  }
  
  return [];
}
```

### 7. FIREBASE/DATABASE STRUCTURE

```
platformSettings/
  └── featureVisibilityByRole
      ├── superadmin: { "Dashboard": true, "Projects": true, ... }
      ├── admin: { "Dashboard": true, "Projects": true, ... }
      ├── team: { "Dashboard": true, "Projects": true, ... }
      ├── affiliate: { "Dashboard": true, "Projects": true, ... }
      ├── consultant: { "Dashboard": true, "Projects": true, ... }
      ├── customer: { "Dashboard": true, ... }
      └── viewer: { "Dashboard": true, ... }
```

### 8. KEY FILES TO CREATE/MODIFY

1. `contexts/user-profile-context.tsx` - Add viewAsRole state and getEffectiveRole()
2. `lib/feature-visibility.ts` - Feature visibility hook with Firestore sync
3. `lib/role-permissions.ts` - RBAC permissions and data filtering
4. `app/(portal)/portal/settings/page.tsx` - Feature Visibility settings UI
5. `components/portal/portal-sidebar.tsx` - Filter nav items by feature visibility
6. Data pages (projects, opportunities, customers) - Apply filterDataByRole()

### 9. UI/UX REQUIREMENTS

- Role switcher should be prominent but not intrusive (e.g., in sidebar footer)
- Feature Visibility settings should show clear visual feedback on save
- Disabled features should show tooltips explaining why
- Use badges to show feature counts per role
- Support copying settings between roles for efficiency
- Real-time updates when settings change (Firestore listener)

### 10. TESTING CHECKLIST

- [ ] SuperAdmin can switch to view as any role
- [ ] Role switcher resets when logging out
- [ ] Feature visibility changes reflect immediately in sidebar
- [ ] Admin cannot edit/delete SuperAdmin users
- [ ] Affiliates/Customers only see assigned content
- [ ] Settings persist across page refreshes
- [ ] Copy from role works correctly
- [ ] Reset to defaults works per role
```

---

## Quick Start Commands

```bash
# Create the feature visibility utility
touch lib/feature-visibility.ts

# Create the role permissions utility  
touch lib/role-permissions.ts

# The settings page should already exist, update it for Feature Visibility
# The sidebar should already exist, add feature visibility filtering
```

## Dependencies

- Firebase/Firestore for data persistence
- React Context for state management
- shadcn/ui components (Tabs, Switch, Button, Badge, Select, Card)
- Lucide icons

---

## Summary

This system provides:
1. **Role Switcher** - SuperAdmin can view platform as any role
2. **Feature Visibility** - Per-role configuration of visible features
3. **RBAC** - Data filtering based on user permissions
4. **Real-time sync** - Firestore listeners for instant updates
5. **Admin protection** - SuperAdmin users protected from Admin modifications
