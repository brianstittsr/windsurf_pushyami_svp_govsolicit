import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * API endpoint to manually link a Firebase Auth UID to a team member by email.
 * This bypasses client-side Firestore rules.
 * 
 * Usage: GET /api/link-user?email=brianstittsr@gmail.com&uid=FIREBASE_UID
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const uid = searchParams.get("uid");

  if (!adminDb) {
    return NextResponse.json({ error: "Firebase Admin not configured" }, { status: 500 });
  }

  if (!email || !uid) {
    return NextResponse.json({ error: "Both email and uid parameters required" }, { status: 400 });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    
    // Find team member by email
    const snapshot = await adminDb.collection("teamMembers").get();
    let matchedDocId: string | null = null;
    let matchedData: FirebaseFirestore.DocumentData | null = null;

    snapshot.forEach((doc) => {
      const data = doc.data();
      const primaryEmail = (data.emailPrimary || "").toLowerCase().trim();
      const secondaryEmail = (data.emailSecondary || "").toLowerCase().trim();

      if (primaryEmail === normalizedEmail || secondaryEmail === normalizedEmail) {
        matchedDocId = doc.id;
        matchedData = data;
      }
    });

    if (!matchedDocId || !matchedData) {
      return NextResponse.json({ 
        error: "No team member found with this email",
        searchedEmail: normalizedEmail 
      }, { status: 404 });
    }

    // Update the team member with the Firebase UID
    await adminDb.collection("teamMembers").doc(matchedDocId).update({
      firebaseUid: uid,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: `Successfully linked Firebase UID to team member`,
      teamMember: {
        id: matchedDocId,
        emailPrimary: matchedData["emailPrimary"],
        role: matchedData["role"],
        firstName: matchedData["firstName"],
        lastName: matchedData["lastName"],
        firebaseUid: uid,
      },
    });
  } catch (error) {
    console.error("Error linking user:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
