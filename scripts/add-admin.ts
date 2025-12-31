/**
 * Script to add Admin user to the system
 * 
 * Usage: npx tsx scripts/add-admin.ts
 * 
 * This script adds sblackman@itmcsolutions.com as an Admin user
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (only if not already initialized)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const auth = getAuth();
const db = getFirestore();

const ADMIN_EMAIL = 'sblackman@itmcsolutions.com';
const ADMIN_NAME = 'Sheyla Blackman';

async function addAdmin() {
  try {
    console.log('🚀 Starting Admin creation process...\n');

    // Step 1: Check if user already exists in Firebase Auth
    let user;
    try {
      user = await auth.getUserByEmail(ADMIN_EMAIL);
      console.log(`✅ User already exists in Firebase Auth: ${user.uid}`);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log('📝 User not found in Firebase Auth. Creating new user...');
        
        // Create new user in Firebase Auth
        user = await auth.createUser({
          email: ADMIN_EMAIL,
          displayName: ADMIN_NAME,
          emailVerified: true,
        });
        
        console.log(`✅ Created Firebase Auth user: ${user.uid}`);
      } else {
        throw error;
      }
    }

    // Step 2: Set custom claims for Admin
    await auth.setCustomUserClaims(user.uid, {
      role: 'admin',
      admin: true,
    });
    console.log('✅ Set custom claims: role=admin');

    // Step 3: Create or update TeamMember document in Firestore
    const teamMemberRef = db.collection('teamMembers').doc(user.uid);
    const teamMemberDoc = await teamMemberRef.get();

    const teamMemberData = {
      email: ADMIN_EMAIL,
      firstName: 'Sheyla',
      lastName: 'Blackman',
      role: 'admin',
      title: 'CEO',
      status: 'active',
      firebaseUid: user.uid,
      updatedAt: new Date(),
    };

    if (teamMemberDoc.exists) {
      await teamMemberRef.update({
        ...teamMemberData,
        updatedAt: new Date(),
      });
      console.log('✅ Updated existing TeamMember document');
    } else {
      await teamMemberRef.set({
        ...teamMemberData,
        createdAt: new Date(),
      });
      console.log('✅ Created new TeamMember document');
    }

    // Step 4: Verify the setup
    const updatedUser = await auth.getUser(user.uid);
    const claims = updatedUser.customClaims;
    
    console.log('\n✨ Admin setup complete!\n');
    console.log('User Details:');
    console.log(`  Email: ${ADMIN_EMAIL}`);
    console.log(`  UID: ${user.uid}`);
    console.log(`  Role: ${claims?.role}`);
    console.log(`  Admin: ${claims?.admin}`);
    console.log('\n🎉 Sheyla Blackman is now an Admin!');
    
  } catch (error) {
    console.error('❌ Error adding Admin:', error);
    throw error;
  }
}

// Run the script
addAdmin()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
