import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

/**
 * Role Permissions:
 * 
 * SUPERADMIN (brianstittsr@gmail.com):
 * - Full platform control
 * - Can hide/show features on the platform
 * - Can manage all users (add, edit, delete)
 * - Can manage all settings
 * - Can access all data
 * 
 * ADMIN (pduvvuri@xprotege.com):
 * - Can manage users (add, edit only - NO delete)
 * - Can manage features on the platform
 * - Cannot hide/show platform features (that's SuperAdmin only)
 * - Cannot delete user accounts
 */

const adminUsers = [
  {
    id: "superadmin-brian-stitt",
    firebaseUid: "", // Will be populated when user signs up/logs in
    firstName: "Brian",
    lastName: "Stitt",
    emailPrimary: "brianstittsr@gmail.com",
    role: "superadmin" as const,
    title: "Platform Owner",
    company: "XProtege",
    expertise: "Platform Administration & Technology Leadership",
    status: "active" as const,
    permissions: {
      // Feature visibility control (SuperAdmin only)
      canHideShowFeatures: true,
      canManagePlatformSettings: true,
      // User management
      canAddUsers: true,
      canEditUsers: true,
      canDeleteUsers: true,
      // Data access
      canViewAllData: true,
      canExportData: true,
      canDeleteData: true,
      // Job management
      canManageJobs: true,
      canViewApplications: true,
      canManageApplications: true,
      // Content management
      canManageContent: true,
      canPublishContent: true,
      // System
      canAccessAdminPortal: true,
      canManageIntegrations: true,
      canViewAuditLogs: true,
    },
    featureAccess: {
      // All features enabled for SuperAdmin
      commandCenter: true,
      opportunities: true,
      projects: true,
      affiliates: true,
      customers: true,
      govSolicitations: true,
      fpdsSearch: true,
      apolloSearch: true,
      supplierSearch: true,
      documents: true,
      calendar: true,
      availability: true,
      meetings: true,
      rocks: true,
      networking: true,
      deals: true,
      linkedinContent: true,
      eos2Dashboard: true,
      docuseal: true,
      aiWorkforce: true,
      proposalCreator: true,
      goHighLevel: true,
      bugTracker: true,
      xprotegeTools: true,
      careers: true,
      adminPanel: true,
    },
  },
  {
    id: "admin-pushyami-duvvuri",
    firebaseUid: "", // Will be populated when user signs up/logs in
    firstName: "Pushyami",
    lastName: "Duvvuri",
    emailPrimary: "pduvvuri@xprotege.com",
    role: "admin" as const,
    title: "President & Founder",
    company: "XProtege",
    expertise: "IT Leadership, Federal Contracting, Digital Transformation",
    status: "active" as const,
    permissions: {
      // Feature visibility control (Admin cannot hide/show features)
      canHideShowFeatures: false,
      canManagePlatformSettings: true,
      // User management (can add/edit but NOT delete)
      canAddUsers: true,
      canEditUsers: true,
      canDeleteUsers: false, // Admin cannot delete users
      // Data access
      canViewAllData: true,
      canExportData: true,
      canDeleteData: false, // Admin cannot delete data
      // Job management
      canManageJobs: true,
      canViewApplications: true,
      canManageApplications: true,
      // Content management
      canManageContent: true,
      canPublishContent: true,
      // System
      canAccessAdminPortal: true,
      canManageIntegrations: true,
      canViewAuditLogs: true,
    },
    featureAccess: {
      // Most features enabled for Admin
      commandCenter: true,
      opportunities: true,
      projects: true,
      affiliates: true,
      customers: true,
      govSolicitations: true,
      fpdsSearch: true,
      apolloSearch: true,
      supplierSearch: true,
      documents: true,
      calendar: true,
      availability: true,
      meetings: true,
      rocks: true,
      networking: true,
      deals: true,
      linkedinContent: true,
      eos2Dashboard: true,
      docuseal: true,
      aiWorkforce: true,
      proposalCreator: true,
      goHighLevel: true,
      bugTracker: true,
      xprotegeTools: true,
      careers: true,
      adminPanel: true,
    },
  },
];

export async function GET() {
  if (!db) {
    return NextResponse.json(
      { error: "Firebase not configured" },
      { status: 500 }
    );
  }

  try {
    const results = [];

    for (const admin of adminUsers) {
      const adminData = {
        ...admin,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      // Save to teamMembers collection
      const docRef = doc(db, "teamMembers", admin.id);
      await setDoc(docRef, adminData);
      results.push({
        id: admin.id,
        email: admin.emailPrimary,
        role: admin.role,
        name: `${admin.firstName} ${admin.lastName}`,
        status: "created",
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${results.length} admin users`,
      admins: results,
      rolePermissions: {
        superadmin: {
          description: "Full platform control including hide/show features and delete users",
          user: "brianstittsr@gmail.com",
        },
        admin: {
          description: "User and feature management (add/edit only, no delete)",
          user: "pduvvuri@xprotege.com",
        },
      },
    });
  } catch (error) {
    console.error("Error seeding admins:", error);
    return NextResponse.json(
      { error: "Failed to seed admins", details: String(error) },
      { status: 500 }
    );
  }
}
