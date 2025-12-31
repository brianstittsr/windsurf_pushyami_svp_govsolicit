import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!adminDb) {
    return NextResponse.json({ error: "Firebase Admin not configured" }, { status: 500 });
  }

  if (!email) {
    return NextResponse.json({ error: "Email parameter required" }, { status: 400 });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    
    // Get all team members and check for email match
    const snapshot = await adminDb.collection("teamMembers").get();
    const allMembers: Record<string, unknown>[] = [];
    let matchedMember: Record<string, unknown> | null = null;

    snapshot.forEach((doc) => {
      const data = doc.data();
      const member = { id: doc.id, ...data };
      allMembers.push({
        id: doc.id,
        emailPrimary: data.emailPrimary,
        emailSecondary: data.emailSecondary,
        role: data.role,
        firebaseUid: data.firebaseUid,
      });

      const primaryEmail = (data.emailPrimary || "").toLowerCase().trim();
      const secondaryEmail = (data.emailSecondary || "").toLowerCase().trim();

      if (primaryEmail === normalizedEmail || secondaryEmail === normalizedEmail) {
        matchedMember = member;
      }
    });

    return NextResponse.json({
      searchedEmail: email,
      normalizedEmail,
      totalTeamMembers: allMembers.length,
      allMembers,
      matchedMember: matchedMember ? {
        id: (matchedMember as Record<string, unknown>).id,
        emailPrimary: (matchedMember as Record<string, unknown>).emailPrimary,
        role: (matchedMember as Record<string, unknown>).role,
        firebaseUid: (matchedMember as Record<string, unknown>).firebaseUid,
        firstName: (matchedMember as Record<string, unknown>).firstName,
        lastName: (matchedMember as Record<string, unknown>).lastName,
      } : null,
    });
  } catch (error) {
    console.error("Error debugging user:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
