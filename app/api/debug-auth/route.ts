import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

/**
 * Debug endpoint to check team member lookup by firebaseUid
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
      return NextResponse.json({
        found: false,
        message: "No team member found with this firebaseUid",
        searchedUid: uid,
      });
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    return NextResponse.json({
      found: true,
      teamMember: {
        id: doc.id,
        emailPrimary: data.emailPrimary,
        role: data.role,
        firebaseUid: data.firebaseUid,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  } catch (error) {
    console.error("Error debugging auth:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
