import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { headers } from "next/headers";

/**
 * API endpoint that automatically links the current Firebase user to their team member record.
 * Called from the client after authentication to ensure the link is established.
 * 
 * POST /api/auto-link
 * Body: { email: string, uid: string }
 */
export async function POST(request: Request) {
  if (!adminDb) {
    return NextResponse.json({ error: "Firebase Admin not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { email, uid } = body;

    if (!email || !uid) {
      return NextResponse.json({ error: "Both email and uid required in body" }, { status: 400 });
    }

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
        linked: false,
        message: "No team member found with this email",
      });
    }

    // Check if already linked
    if (matchedData["firebaseUid"] === uid) {
      return NextResponse.json({
        linked: true,
        alreadyLinked: true,
        teamMember: {
          id: matchedDocId,
          role: matchedData["role"],
          firstName: matchedData["firstName"],
          lastName: matchedData["lastName"],
        },
      });
    }

    // Check if linked to different account
    if (matchedData["firebaseUid"] && matchedData["firebaseUid"] !== uid) {
      return NextResponse.json({ 
        linked: false,
        message: "Team member is linked to a different account",
      });
    }

    // Update the team member with the Firebase UID
    await adminDb.collection("teamMembers").doc(matchedDocId).update({
      firebaseUid: uid,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      linked: true,
      message: "Successfully linked Firebase account to team member",
      teamMember: {
        id: matchedDocId,
        role: matchedData["role"],
        firstName: matchedData["firstName"],
        lastName: matchedData["lastName"],
      },
    });
  } catch (error) {
    console.error("Error auto-linking user:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
