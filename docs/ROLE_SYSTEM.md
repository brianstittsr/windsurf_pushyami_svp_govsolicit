# ITMC Solutions Role System

**Last Updated:** December 30, 2024

---

## Overview

The ITMC Solutions platform uses a hierarchical role-based access control (RBAC) system to manage user permissions and feature access. This system supports both organizational hierarchy and feature-level access control.

---

## Role Definitions

### 1. SuperAdmin
**Level:** Highest Authority  
**Description:** Complete control over the entire system with ability to manage features, billing, and all users.

**Permissions:**
- ✅ Full system access to all features
- ✅ Manage all users including Admins
- ✅ Delete any user except other SuperAdmins
- ✅ Configure feature visibility and availability
- ✅ Hide/show features based on subscription/payment status
- ✅ Access billing and subscription management
- ✅ Configure system-wide settings
- ✅ View all audit logs and system analytics
- ✅ Manage integrations and API keys
- ✅ Configure data sources and external connections

**Use Cases:**
- Platform owner/operator
- System administrator
- Billing administrator
- Feature configuration manager

**Restrictions:**
- Cannot be deleted by Admins
- Requires special authentication/verification for sensitive operations

---

### 2. Admin
**Level:** Organization Administrator  
**Description:** Management control over available features and users within the organization.

**Permissions:**
- ✅ Manage users (create, edit, delete) except SuperAdmins
- ✅ Access all enabled features
- ✅ Configure organization settings
- ✅ Manage team members and roles
- ✅ View organization analytics and reports
- ✅ Manage projects, opportunities, and initiatives
- ✅ Configure workflows and automation
- ✅ Manage integrations (Apollo, ThomasNet, GoHighLevel, etc.)
- ✅ Access admin-only features:
  - Rocks/EOS2 Dashboard
  - Platform Settings
  - Apollo Contacts/Lists
  - ThomasNet Suppliers/Lists
  - GoHighLevel Integrations
  - Traction/EOS2 Collections
  - Mattermost Playbooks

**Use Cases:**
- Organization administrator
- IT manager
- Department head
- Project manager with elevated permissions

**Restrictions:**
- ❌ Cannot delete SuperAdmin users
- ❌ Cannot access billing/subscription settings
- ❌ Cannot hide/show features (only SuperAdmin)
- ❌ Cannot modify system-wide configurations

---

### 3. Affiliate
**Level:** Partner/Collaborator  
**Description:** Users engaged in networking, opportunities, and initiatives with limited administrative access.

**Permissions:**
- ✅ Access networking features
- ✅ Manage own opportunities and deals
- ✅ Participate in initiatives and projects
- ✅ View and edit assigned tasks
- ✅ Access calendar and availability
- ✅ Manage own profile and contacts
- ✅ Create and share content (LinkedIn, proposals)
- ✅ Access AI tools (AI Workforce, Proposal Creator)
- ✅ View documents and meetings
- ✅ Participate in collaboration tools

**Use Cases:**
- Strategic partners
- Consultants
- Contractors
- External collaborators
- Network members

**Restrictions:**
- ❌ Cannot access admin features
- ❌ Cannot manage other users
- ❌ Cannot access organization settings
- ❌ Cannot view system-wide analytics
- ❌ Limited access to customer data
- ❌ Cannot configure integrations

---

### 4. Viewer
**Level:** Read-Only Access  
**Description:** Read-only access to backend data and reports without modification capabilities.

**Permissions:**
- ✅ View dashboards and reports
- ✅ View projects and opportunities (assigned or public)
- ✅ View documents and files
- ✅ View calendar events
- ✅ View meeting notes and recordings
- ✅ Export reports and data
- ✅ View analytics and metrics
- ✅ Access read-only API endpoints

**Use Cases:**
- Executives and stakeholders
- Auditors
- Compliance officers
- External reviewers
- Reporting analysts

**Restrictions:**
- ❌ Cannot create, edit, or delete any data
- ❌ Cannot manage users or settings
- ❌ Cannot access admin features
- ❌ Cannot participate in workflows
- ❌ Cannot upload files or documents
- ❌ Cannot send messages or notifications
- ❌ Cannot configure anything

---

## Legacy Roles (Maintained for Backward Compatibility)

### Team
**Description:** Standard team member with full collaboration access.  
**Equivalent to:** Affiliate with additional internal team permissions

### Customer
**Description:** External customer with limited portal access.  
**Equivalent to:** Viewer with customer-specific data access

### Partner
**Description:** Strategic partner with collaboration access.  
**Equivalent to:** Affiliate

---

## Role Hierarchy

```
SuperAdmin (Level 5)
    ↓
Admin (Level 4)
    ↓
Team (Level 3)
    ↓
Affiliate (Level 2)
    ↓
Viewer (Level 1)
```

**Inheritance Rules:**
- Higher roles inherit all permissions from lower roles
- SuperAdmin can perform all actions
- Admin can manage all roles except SuperAdmin
- Lower roles cannot modify higher roles

---

## Feature Access Matrix

| Feature | SuperAdmin | Admin | Affiliate | Viewer | Team | Customer | Partner |
|---------|------------|-------|-----------|--------|------|----------|---------|
| Command Center | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Opportunities | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Projects | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Networking | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Documents | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Calendar | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Gov Solicitations | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| AI Tools | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| Rocks/EOS2 | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Platform Settings | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| User Management | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Billing | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Feature Toggle | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Apollo/ThomasNet | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| GoHighLevel | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## Implementation

### Type Definition
```typescript
export type UserRole = 'superadmin' | 'admin' | 'affiliate' | 'viewer' | 'team' | 'customer' | 'partner';
```

### Role Checking Functions

```typescript
// Check if user is SuperAdmin
export function isSuperAdmin(role: UserRole): boolean {
  return role === 'superadmin';
}

// Check if user has admin privileges (SuperAdmin or Admin)
export function isAdmin(role: UserRole): boolean {
  return role === 'superadmin' || role === 'admin';
}

// Check if user can edit data
export function canEdit(role: UserRole): boolean {
  return role !== 'viewer';
}

// Check if user can manage other users
export function canManageUsers(role: UserRole): boolean {
  return role === 'superadmin' || role === 'admin';
}

// Check if user can delete a target user
export function canDeleteUser(userRole: UserRole, targetRole: UserRole): boolean {
  if (targetRole === 'superadmin') return false; // SuperAdmins cannot be deleted
  if (userRole === 'superadmin') return true; // SuperAdmin can delete anyone except other SuperAdmins
  if (userRole === 'admin' && targetRole !== 'superadmin') return true; // Admin can delete non-SuperAdmins
  return false;
}
```

### Firestore Security Rules

```javascript
function getUserRole() {
  return get(/databases/$(database)/documents/teamMembers/$(request.auth.uid)).data.role;
}

function isSuperAdmin() {
  return getUserRole() == 'superadmin';
}

function isAdmin() {
  let role = getUserRole();
  return role == 'superadmin' || role == 'admin';
}

function canEdit() {
  return getUserRole() != 'viewer';
}
```

---

## Migration Guide

### Updating Existing Users

1. **Identify Current Admins** - These should become either `admin` or `superadmin`
2. **Identify Partners/Affiliates** - Map to `affiliate` role
3. **Identify Read-Only Users** - Map to `viewer` role
4. **Assign SuperAdmin** - Designate at least one `superadmin` for the organization

### Database Migration Script

```typescript
// Example migration for Firestore
async function migrateUserRoles() {
  const usersRef = collection(db, 'teamMembers');
  const snapshot = await getDocs(usersRef);
  
  const batch = writeBatch(db);
  
  snapshot.forEach((doc) => {
    const data = doc.data();
    let newRole: UserRole;
    
    // Map old roles to new roles
    switch (data.role) {
      case 'admin':
        // Decide if this should be superadmin or admin
        newRole = 'admin'; // or 'superadmin' for platform owners
        break;
      case 'team':
        newRole = 'team'; // Keep as is
        break;
      case 'affiliate':
        newRole = 'affiliate'; // Keep as is
        break;
      case 'customer':
        newRole = 'viewer'; // Map customers to viewer
        break;
      case 'partner':
        newRole = 'affiliate'; // Map partners to affiliate
        break;
      default:
        newRole = 'viewer'; // Default to viewer for safety
    }
    
    batch.update(doc.ref, { role: newRole });
  });
  
  await batch.commit();
}
```

---

## Best Practices

### Role Assignment
1. **Principle of Least Privilege** - Assign the minimum role necessary
2. **SuperAdmin Sparingly** - Limit SuperAdmin to 1-2 trusted individuals
3. **Regular Audits** - Review role assignments quarterly
4. **Document Changes** - Log all role changes with justification

### Security
1. **Two-Factor Authentication** - Required for SuperAdmin and Admin roles
2. **Session Timeout** - Shorter timeouts for elevated roles
3. **Audit Logging** - Log all actions by SuperAdmin and Admin
4. **IP Restrictions** - Consider IP allowlisting for SuperAdmin

### Feature Gating
1. **Check Role on Client** - Hide UI elements based on role
2. **Enforce on Server** - Always validate role on backend
3. **Graceful Degradation** - Show appropriate messages for insufficient permissions
4. **Feature Flags** - Use SuperAdmin to toggle features for testing

---

## Testing Checklist

- [ ] SuperAdmin can access all features
- [ ] SuperAdmin can manage all users
- [ ] SuperAdmin can toggle features
- [ ] Admin cannot delete SuperAdmin
- [ ] Admin can manage non-SuperAdmin users
- [ ] Admin can access admin-only features
- [ ] Affiliate can access networking and opportunities
- [ ] Affiliate cannot access admin features
- [ ] Viewer can only read data
- [ ] Viewer cannot modify anything
- [ ] Role changes are logged
- [ ] Firestore rules enforce role permissions

---

## Support

For questions about role assignments or permissions:
- **Technical:** See implementation in `types/index.ts` and `contexts/user-profile-context.tsx`
- **Business:** Contact ITMC Solutions support at contact@itmcsolutions.com
- **Security:** Report security concerns to security@itmcsolutions.com

---

**Version:** 1.0  
**Last Updated:** December 30, 2024  
**Maintained By:** ITMC Solutions Development Team
