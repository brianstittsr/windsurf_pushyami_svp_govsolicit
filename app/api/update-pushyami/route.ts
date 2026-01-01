import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * One-time API to update Pushyami's record with photo and leadership info
 */
export async function GET() {
  if (!adminDb) {
    return NextResponse.json({ error: "Firebase Admin not configured" }, { status: 500 });
  }

  try {
    const docRef = adminDb.collection("teamMembers").doc("admin-pushyami-duvvuri");
    
    await docRef.update({
      avatar: "/Pushyami.png",
      bio: "Pushyami Duvvuri is a dynamic and accomplished leader with a passion for both business innovation and community impact. A resident of Ellicott City, MD, for over 24 years, Pushyami's career began as an IT consultant, where she quickly rose to leadership roles. As the founder and president of XProtege, she has demonstrated exceptional leadership in the tech industry, providing innovative product development solutions and helping clients achieve business success. She also serves as President of the Maryland Chapter of ITServe Alliance and is the founder of the Janayitri Foundation.",
      linkedIn: "https://www.linkedin.com/company/xprotege-institute-of-management-and-technology/",
      isCEO: true,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: "Updated Pushyami's record with photo and leadership info",
    });
  } catch (error) {
    console.error("Error updating Pushyami:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
