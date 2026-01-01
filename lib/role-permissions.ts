"use client";

/**
 * Role-Based Access Control (RBAC) Permissions
 * 
 * Role Hierarchy:
 * - SuperAdmin: Full platform access, can modify all users and settings
 * - Admin: Can see all data, modify users (except SuperAdmin), manage settings
 * - Team: Internal team members, see all projects they're assigned to
 * - Affiliate/Consultant: External partners, see only content assigned to them
 * - Customer: External customers, see only their own projects/content
 * - Viewer: Read-only access to assigned content
 */

export type UserRole = "superadmin" | "admin" | "team" | "affiliate" | "consultant" | "customer" | "viewer";

export interface RolePermissions {
  // Data Access
  canViewAllData: boolean;           // Can see all projects, customers, etc.
  canViewAssignedOnly: boolean;      // Can only see content assigned to them
  
  // User Management
  canCreateUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canEditSuperAdmin: boolean;        // Can modify SuperAdmin users
  canChangeUserRoles: boolean;
  canPromoteToAdmin: boolean;        // Can promote users to Admin role
  canPromoteToSuperAdmin: boolean;   // Can promote users to SuperAdmin role
  
  // Settings
  canManagePlatformSettings: boolean;
  canManageFeatureVisibility: boolean;
  canManageIntegrations: boolean;
  
  // Content
  canCreateContent: boolean;
  canEditOwnContent: boolean;
  canEditAllContent: boolean;
  canDeleteContent: boolean;
  
  // Projects
  canCreateProjects: boolean;
  canViewAllProjects: boolean;
  canEditAllProjects: boolean;
  canAssignUsersToProjects: boolean;
  
  // Admin Features
  canAccessAdminPanel: boolean;
  canViewAuditLogs: boolean;
  canExportData: boolean;
}

// Define permissions for each role
const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  superadmin: {
    canViewAllData: true,
    canViewAssignedOnly: false,
    canCreateUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canEditSuperAdmin: true,
    canChangeUserRoles: true,
    canPromoteToAdmin: true,
    canPromoteToSuperAdmin: true,
    canManagePlatformSettings: true,
    canManageFeatureVisibility: true,
    canManageIntegrations: true,
    canCreateContent: true,
    canEditOwnContent: true,
    canEditAllContent: true,
    canDeleteContent: true,
    canCreateProjects: true,
    canViewAllProjects: true,
    canEditAllProjects: true,
    canAssignUsersToProjects: true,
    canAccessAdminPanel: true,
    canViewAuditLogs: true,
    canExportData: true,
  },
  admin: {
    canViewAllData: true,
    canViewAssignedOnly: false,
    canCreateUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canEditSuperAdmin: false,        // Admin CANNOT edit SuperAdmin
    canChangeUserRoles: true,
    canPromoteToAdmin: true,
    canPromoteToSuperAdmin: false,   // Admin CANNOT promote to SuperAdmin
    canManagePlatformSettings: true,
    canManageFeatureVisibility: false, // Only SuperAdmin
    canManageIntegrations: true,
    canCreateContent: true,
    canEditOwnContent: true,
    canEditAllContent: true,
    canDeleteContent: true,
    canCreateProjects: true,
    canViewAllProjects: true,
    canEditAllProjects: true,
    canAssignUsersToProjects: true,
    canAccessAdminPanel: true,
    canViewAuditLogs: true,
    canExportData: true,
  },
  team: {
    canViewAllData: true,            // Team can see all data
    canViewAssignedOnly: false,
    canCreateUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canEditSuperAdmin: false,
    canChangeUserRoles: false,
    canPromoteToAdmin: false,
    canPromoteToSuperAdmin: false,
    canManagePlatformSettings: false,
    canManageFeatureVisibility: false,
    canManageIntegrations: false,
    canCreateContent: true,
    canEditOwnContent: true,
    canEditAllContent: false,
    canDeleteContent: false,
    canCreateProjects: true,
    canViewAllProjects: true,
    canEditAllProjects: false,
    canAssignUsersToProjects: false,
    canAccessAdminPanel: false,
    canViewAuditLogs: false,
    canExportData: false,
  },
  affiliate: {
    canViewAllData: false,
    canViewAssignedOnly: true,       // Affiliates see only assigned content
    canCreateUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canEditSuperAdmin: false,
    canChangeUserRoles: false,
    canPromoteToAdmin: false,
    canPromoteToSuperAdmin: false,
    canManagePlatformSettings: false,
    canManageFeatureVisibility: false,
    canManageIntegrations: false,
    canCreateContent: true,
    canEditOwnContent: true,
    canEditAllContent: false,
    canDeleteContent: false,
    canCreateProjects: false,
    canViewAllProjects: false,
    canEditAllProjects: false,
    canAssignUsersToProjects: false,
    canAccessAdminPanel: false,
    canViewAuditLogs: false,
    canExportData: false,
  },
  consultant: {
    canViewAllData: false,
    canViewAssignedOnly: true,       // Consultants see only assigned content
    canCreateUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canEditSuperAdmin: false,
    canChangeUserRoles: false,
    canPromoteToAdmin: false,
    canPromoteToSuperAdmin: false,
    canManagePlatformSettings: false,
    canManageFeatureVisibility: false,
    canManageIntegrations: false,
    canCreateContent: true,
    canEditOwnContent: true,
    canEditAllContent: false,
    canDeleteContent: false,
    canCreateProjects: false,
    canViewAllProjects: false,
    canEditAllProjects: false,
    canAssignUsersToProjects: false,
    canAccessAdminPanel: false,
    canViewAuditLogs: false,
    canExportData: false,
  },
  customer: {
    canViewAllData: false,
    canViewAssignedOnly: true,       // Customers see only their own content
    canCreateUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canEditSuperAdmin: false,
    canChangeUserRoles: false,
    canPromoteToAdmin: false,
    canPromoteToSuperAdmin: false,
    canManagePlatformSettings: false,
    canManageFeatureVisibility: false,
    canManageIntegrations: false,
    canCreateContent: false,
    canEditOwnContent: false,
    canEditAllContent: false,
    canDeleteContent: false,
    canCreateProjects: false,
    canViewAllProjects: false,
    canEditAllProjects: false,
    canAssignUsersToProjects: false,
    canAccessAdminPanel: false,
    canViewAuditLogs: false,
    canExportData: false,
  },
  viewer: {
    canViewAllData: false,
    canViewAssignedOnly: true,       // Viewers see only assigned content
    canCreateUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canEditSuperAdmin: false,
    canChangeUserRoles: false,
    canPromoteToAdmin: false,
    canPromoteToSuperAdmin: false,
    canManagePlatformSettings: false,
    canManageFeatureVisibility: false,
    canManageIntegrations: false,
    canCreateContent: false,
    canEditOwnContent: false,
    canEditAllContent: false,
    canDeleteContent: false,
    canCreateProjects: false,
    canViewAllProjects: false,
    canEditAllProjects: false,
    canAssignUsersToProjects: false,
    canAccessAdminPanel: false,
    canViewAuditLogs: false,
    canExportData: false,
  },
};

/**
 * Get permissions for a specific role
 */
export function getRolePermissions(role: string): RolePermissions {
  const normalizedRole = role?.toLowerCase() as UserRole;
  return ROLE_PERMISSIONS[normalizedRole] || ROLE_PERMISSIONS.viewer;
}

/**
 * Check if a user can perform a specific action
 */
export function hasPermission(
  userRole: string,
  permission: keyof RolePermissions
): boolean {
  const permissions = getRolePermissions(userRole);
  return permissions[permission] || false;
}

/**
 * Check if a user can edit another user based on roles
 */
export function canEditUser(
  editorRole: string,
  targetUserRole: string
): boolean {
  const editorPermissions = getRolePermissions(editorRole);
  
  // Can't edit users at all
  if (!editorPermissions.canEditUsers) return false;
  
  // Target is SuperAdmin - only SuperAdmin can edit
  if (targetUserRole?.toLowerCase() === "superadmin") {
    return editorPermissions.canEditSuperAdmin;
  }
  
  return true;
}

/**
 * Check if a user can delete another user based on roles
 */
export function canDeleteUser(
  deleterRole: string,
  targetUserRole: string
): boolean {
  const deleterPermissions = getRolePermissions(deleterRole);
  
  // Can't delete users at all
  if (!deleterPermissions.canDeleteUsers) return false;
  
  // Target is SuperAdmin - only SuperAdmin can delete
  if (targetUserRole?.toLowerCase() === "superadmin") {
    return deleterPermissions.canEditSuperAdmin;
  }
  
  return true;
}

/**
 * Check if a user can change another user's role to a specific role
 */
export function canChangeRoleTo(
  changerRole: string,
  newRole: string
): boolean {
  const changerPermissions = getRolePermissions(changerRole);
  
  if (!changerPermissions.canChangeUserRoles) return false;
  
  const normalizedNewRole = newRole?.toLowerCase();
  
  // Promoting to SuperAdmin
  if (normalizedNewRole === "superadmin") {
    return changerPermissions.canPromoteToSuperAdmin;
  }
  
  // Promoting to Admin
  if (normalizedNewRole === "admin") {
    return changerPermissions.canPromoteToAdmin;
  }
  
  return true;
}

/**
 * Get available roles that a user can assign to others
 */
export function getAssignableRoles(userRole: string): UserRole[] {
  const permissions = getRolePermissions(userRole);
  
  if (!permissions.canChangeUserRoles) return [];
  
  const roles: UserRole[] = ["team", "affiliate", "consultant", "customer", "viewer"];
  
  if (permissions.canPromoteToAdmin) {
    roles.unshift("admin");
  }
  
  if (permissions.canPromoteToSuperAdmin) {
    roles.unshift("superadmin");
  }
  
  return roles;
}

/**
 * Filter data based on user role and assignments
 * @param data Array of items to filter
 * @param userRole Current user's role
 * @param userId Current user's ID
 * @param assignmentField Field name that contains assigned user IDs (e.g., "assignedTo", "teamMembers")
 * @param ownerField Field name that contains the owner ID (e.g., "ownerId", "createdBy")
 */
export function filterDataByRole<T extends Record<string, unknown>>(
  data: T[],
  userRole: string,
  userId: string,
  assignmentField: string = "assignedTo",
  ownerField: string = "ownerId"
): T[] {
  const permissions = getRolePermissions(userRole);
  
  // SuperAdmin, Admin, Team can see all data
  if (permissions.canViewAllData) {
    return data;
  }
  
  // Others can only see assigned content
  if (permissions.canViewAssignedOnly) {
    return data.filter((item) => {
      // Check if user is the owner
      if (item[ownerField] === userId) return true;
      
      // Check if user is in the assigned list
      const assignedUsers = item[assignmentField];
      if (Array.isArray(assignedUsers)) {
        return assignedUsers.includes(userId);
      }
      if (typeof assignedUsers === "string") {
        return assignedUsers === userId;
      }
      
      // Check for alternative assignment fields
      const teamMembers = item["teamMembers"] as string[] | undefined;
      if (Array.isArray(teamMembers) && teamMembers.includes(userId)) {
        return true;
      }
      
      const affiliateId = item["affiliateId"] as string | undefined;
      if (affiliateId === userId) return true;
      
      const customerId = item["customerId"] as string | undefined;
      if (customerId === userId) return true;
      
      return false;
    });
  }
  
  return [];
}

/**
 * Check if user can view a specific item
 */
export function canViewItem<T extends Record<string, unknown>>(
  item: T,
  userRole: string,
  userId: string,
  assignmentField: string = "assignedTo",
  ownerField: string = "ownerId"
): boolean {
  const permissions = getRolePermissions(userRole);
  
  if (permissions.canViewAllData) return true;
  
  if (permissions.canViewAssignedOnly) {
    // Check if user is the owner
    if (item[ownerField] === userId) return true;
    
    // Check if user is in the assigned list
    const assignedUsers = item[assignmentField];
    if (Array.isArray(assignedUsers) && assignedUsers.includes(userId)) {
      return true;
    }
    if (typeof assignedUsers === "string" && assignedUsers === userId) {
      return true;
    }
    
    // Check alternative fields
    const teamMembers = item["teamMembers"] as string[] | undefined;
    if (Array.isArray(teamMembers) && teamMembers.includes(userId)) {
      return true;
    }
    
    if (item["affiliateId"] === userId) return true;
    if (item["customerId"] === userId) return true;
  }
  
  return false;
}

/**
 * Role display names
 */
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  superadmin: "SuperAdmin",
  admin: "Admin",
  team: "Team Member",
  affiliate: "Affiliate",
  consultant: "Consultant",
  customer: "Customer",
  viewer: "Viewer",
};

/**
 * Role descriptions
 */
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  superadmin: "Full platform access and control. Can modify all users and settings.",
  admin: "Can see all data and modify users (except SuperAdmin). Full management capabilities.",
  team: "Internal team member. Can see all projects and create content.",
  affiliate: "External affiliate partner. Can only see content assigned to them.",
  consultant: "External consultant. Can only see content assigned to them.",
  customer: "External customer. Can only see their own projects and content.",
  viewer: "Read-only access to assigned content.",
};
