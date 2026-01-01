import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

/**
 * API endpoint to get team member by Firebase UID
 * This bypasses client-side Firestore rules
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");

  if (!adminDb) {
    return NextResponse.json({ error: "Firebase Admin not configured" }, { status: 500 });
  }

  if (!uid) {
    return NextResponse.json({ error: "uid parameter required" }, { status: 400 });
  }

  try {
    // Query by firebaseUid
    const snapshot = await adminDb.collection("teamMembers")
      .where("firebaseUid", "==", uid)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ teamMember: null });
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    return NextResponse.json({
      teamMember: {
        id: doc.id,
        emailPrimary: data.emailPrimary,
        emailSecondary: data.emailSecondary,
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        company: data.company,
        title: data.title,
        location: data.location,
        bio: data.bio,
        avatar: data.avatar,
        linkedIn: data.linkedIn,
        website: data.website,
        role: data.role,
        status: data.status,
        firebaseUid: data.firebaseUid,
        isCEO: data.isCEO,
        isCOO: data.isCOO,
        isCTO: data.isCTO,
        isCRO: data.isCRO,
        permissions: data.permissions,
        featureAccess: data.featureAccess,
      },
    });
  } catch (error) {
    console.error("Error getting team member:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
