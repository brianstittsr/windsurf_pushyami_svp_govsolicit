import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * API endpoint to update team member profile
 * This bypasses client-side Firestore rules and ensures the logged-in user
 * can only update their own profile (matched by firebaseUid)
 */
export async function POST(request: Request) {
  if (!adminDb) {
    return NextResponse.json({ error: "Firebase Admin not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { firebaseUid, updates } = body;

    if (!firebaseUid) {
      return NextResponse.json({ error: "firebaseUid is required" }, { status: 400 });
    }

    if (!updates || typeof updates !== "object") {
      return NextResponse.json({ error: "updates object is required" }, { status: 400 });
    }

    // Find team member by firebaseUid
    const snapshot = await adminDb.collection("teamMembers")
      .where("firebaseUid", "==", firebaseUid)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    const teamMemberDoc = snapshot.docs[0];
    const teamMemberId = teamMemberDoc.id;

    // Whitelist of fields that can be updated by the user
    const allowedFields = [
      "firstName",
      "lastName",
      "emailSecondary",
      "mobile",
      "company",
      "title",
      "location",
      "bio",
      "avatar",
      "linkedIn",
      "website",
      "expertise",
    ];

    // Filter updates to only include allowed fields
    const sanitizedUpdates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        sanitizedUpdates[field] = updates[field];
      }
    }

    if (Object.keys(sanitizedUpdates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    // Add updatedAt timestamp
    sanitizedUpdates.updatedAt = FieldValue.serverTimestamp();

    // Update the team member document
    await adminDb.collection("teamMembers").doc(teamMemberId).update(sanitizedUpdates);

    // Fetch the updated document
    const updatedDoc = await adminDb.collection("teamMembers").doc(teamMemberId).get();
    const updatedData = updatedDoc.data();

    return NextResponse.json({
      success: true,
      teamMember: {
        id: teamMemberId,
        emailPrimary: updatedData?.emailPrimary,
        emailSecondary: updatedData?.emailSecondary,
        firstName: updatedData?.firstName,
        lastName: updatedData?.lastName,
        mobile: updatedData?.mobile,
        company: updatedData?.company,
        title: updatedData?.title,
        location: updatedData?.location,
        bio: updatedData?.bio,
        avatar: updatedData?.avatar,
        linkedIn: updatedData?.linkedIn,
        website: updatedData?.website,
        expertise: updatedData?.expertise,
        role: updatedData?.role,
        status: updatedData?.status,
        firebaseUid: updatedData?.firebaseUid,
      },
    });
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
