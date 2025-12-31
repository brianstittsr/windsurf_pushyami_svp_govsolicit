import { auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/schema";

/**
 * Server-side helper to verify if a user is an admin
 * Use this in API routes to protect admin-only endpoints
 */
export async function verifyAdmin(authToken: string | null): Promise<boolean> {
  if (!authToken) return false;

  try {
    // In a real implementation, you would verify the Firebase auth token
    // and check the user's role from Firestore
    // For now, this is a placeholder that should be implemented with Firebase Admin SDK
    
    // TODO: Implement with Firebase Admin SDK
    // const decodedToken = await admin.auth().verifyIdToken(authToken);
    // const userDoc = await admin.firestore().collection('users').doc(decodedToken.uid).get();
    // return userDoc.data()?.role === 'admin';
    
    return false;
  } catch (error) {
    console.error("Error verifying admin:", error);
    return false;
  }
}

/**
 * Client-side helper to get auth token for API requests
 */
export async function getAuthToken(): Promise<string | null> {
  if (!auth || !auth.currentUser) return null;
  
  try {
    return await auth.currentUser.getIdToken();
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
}

/**
 * Middleware-style helper for API routes
 * Returns user info if authenticated, null otherwise
 */
export async function getAuthenticatedUser(request: Request): Promise<{ uid: string; role: string } | null> {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7);
    
    // TODO: Implement with Firebase Admin SDK
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // const userDoc = await admin.firestore().collection('users').doc(decodedToken.uid).get();
    // const userData = userDoc.data();
    
    // return {
    //   uid: decodedToken.uid,
    //   role: userData?.role || 'team_member'
    // };
    
    return null;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
}

/**
 * Check if user has admin role
 */
export function isAdmin(user: { role: string } | null): boolean {
  return user?.role === "admin";
}
