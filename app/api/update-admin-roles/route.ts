import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * API endpoint to update admin roles for specific users
 * - brianstittsr@gmail.com -> superadmin
 * - pduvvuri@xprotege.com -> admin
 */
export async function GET() {
  if (!adminDb) {
    return NextResponse.json(
      { error: "Firebase Admin not configured" },
      { status: 500 }
    );
  }

  try {
    const results = [];

    // Update Brian Stitt to SuperAdmin
    const brianQuery = await adminDb.collection("teamMembers")
      .where("emailPrimary", "==", "brianstittsr@gmail.com")
      .get();

    if (!brianQuery.empty) {
      const brianDoc = brianQuery.docs[0];
      await adminDb.collection("teamMembers").doc(brianDoc.id).update({
        role: "superadmin",
        permissions: {
          canHideShowFeatures: true,
          canManagePlatformSettings: true,
          canAddUsers: true,
          canEditUsers: true,
          canDeleteUsers: true,
          canViewAllData: true,
          canExportData: true,
          canDeleteData: true,
          canManageJobs: true,
          canViewApplications: true,
          canManageApplications: true,
          canManageContent: true,
          canPublishContent: true,
          canAccessAdminPortal: true,
          canManageIntegrations: true,
          canViewAuditLogs: true,
        },
        updatedAt: FieldValue.serverTimestamp(),
      });
      results.push({
        email: "brianstittsr@gmail.com",
        role: "superadmin",
        status: "updated",
      });
    } else {
      results.push({
        email: "brianstittsr@gmail.com",
        status: "not found - will be created on next login",
      });
    }

    // Also check secondary email for Brian
    const brianSecondaryQuery = await adminDb.collection("teamMembers")
      .where("emailSecondary", "==", "brianstittsr@gmail.com")
      .get();

    if (!brianSecondaryQuery.empty && brianQuery.empty) {
      const brianDoc = brianSecondaryQuery.docs[0];
      await adminDb.collection("teamMembers").doc(brianDoc.id).update({
        role: "superadmin",
        permissions: {
          canHideShowFeatures: true,
          canManagePlatformSettings: true,
          canAddUsers: true,
          canEditUsers: true,
          canDeleteUsers: true,
          canViewAllData: true,
          canExportData: true,
          canDeleteData: true,
          canManageJobs: true,
          canViewApplications: true,
          canManageApplications: true,
          canManageContent: true,
          canPublishContent: true,
          canAccessAdminPortal: true,
          canManageIntegrations: true,
          canViewAuditLogs: true,
        },
        updatedAt: FieldValue.serverTimestamp(),
      });
      results.push({
        email: "brianstittsr@gmail.com (secondary)",
        role: "superadmin",
        status: "updated",
      });
    }

    // Update Pushyami Duvvuri to Admin
    const pushyamiQuery = await adminDb.collection("teamMembers")
      .where("emailPrimary", "==", "pduvvuri@xprotege.com")
      .get();

    if (!pushyamiQuery.empty) {
      const pushyamiDoc = pushyamiQuery.docs[0];
      await adminDb.collection("teamMembers").doc(pushyamiDoc.id).update({
        role: "admin",
        permissions: {
          canHideShowFeatures: false,
          canManagePlatformSettings: true,
          canAddUsers: true,
          canEditUsers: true,
          canDeleteUsers: false,
          canViewAllData: true,
          canExportData: true,
          canDeleteData: false,
          canManageJobs: true,
          canViewApplications: true,
          canManageApplications: true,
          canManageContent: true,
          canPublishContent: true,
          canAccessAdminPortal: true,
          canManageIntegrations: true,
          canViewAuditLogs: true,
        },
        updatedAt: FieldValue.serverTimestamp(),
      });
      results.push({
        email: "pduvvuri@xprotege.com",
        role: "admin",
        status: "updated",
      });
    } else {
      results.push({
        email: "pduvvuri@xprotege.com",
        status: "not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Admin roles updated",
      results,
    });
  } catch (error) {
    console.error("Error updating admin roles:", error);
    return NextResponse.json(
      { error: "Failed to update admin roles", details: String(error) },
      { status: 500 }
    );
  }
}
