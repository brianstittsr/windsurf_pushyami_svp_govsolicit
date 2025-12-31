/**
 * Master deployment script - Runs all deployment scripts in order
 * 
 * Usage: npx tsx scripts/deploy-all.ts
 * 
 * This script:
 * 1. Deploys Firestore schema
 * 2. Creates SuperAdmin user (brianstittsr@gmail.com)
 * 3. Creates Admin user (sblackman@itmcsolutions.com)
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Check for required environment variables
const requiredEnvVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('\n❌ Missing required Firebase Admin credentials in .env.local:\n');
  missingVars.forEach(v => console.error(`   - ${v}`));
  console.error('\n📋 To fix this:');
  console.error('   1. Go to Firebase Console → Project Settings → Service Accounts');
  console.error('   2. Click "Generate new private key"');
  console.error('   3. Add these to your .env.local file:\n');
  console.error('   FIREBASE_PROJECT_ID=your-project-id');
  console.error('   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com');
  console.error('   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"\n');
  process.exit(1);
}

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

async function deploySchema() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📦 STEP 1: Deploying Firestore Schema');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Platform Settings
  await db.collection('platformSettings').doc('global').set({
    id: 'global',
    integrations: {
      mattermost: { apiKey: '', webhookUrl: '', serverUrl: '', teamId: '', status: 'disconnected' },
      apollo: { apiKey: '', accountId: '', status: 'disconnected' },
      gohighlevel: { apiKey: '', locationId: '', agencyId: '', status: 'disconnected' },
      zoom: { apiKey: '', apiSecret: '', accountId: '', status: 'disconnected' },
      docuseal: { apiKey: '', webhookSecret: '', status: 'disconnected' },
    },
    llmConfig: {
      provider: 'openai',
      model: 'gpt-4o',
      apiKey: '',
      ollamaUrl: 'http://localhost:11434',
      useOllama: false,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }, { merge: true });
  console.log('✅ Platform settings created');

  // Feature Visibility
  await db.collection('platformSettings').doc('featureVisibility').set({
    features: [
      { id: "command-center", name: "Command Center", category: "main", visible: true },
      { id: "opportunities", name: "Opportunities", category: "main", visible: true },
      { id: "projects", name: "Projects", category: "main", visible: true },
      { id: "gov-solicitations", name: "Gov Solicitations", category: "work", visible: true },
      { id: "apollo-search", name: "Apollo Search", category: "work", visible: true, requiresSubscription: true },
      { id: "ai-workforce", name: "AI Workforce", category: "ai", visible: true, requiresSubscription: true },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  }, { merge: true });
  console.log('✅ Feature visibility settings created');

  // Solicitation Sources
  await db.collection('platformSettings').doc('solicitationSources').set({
    sources: [
      { id: 'sam-gov', name: 'SAM.gov', enabled: true, status: 'inactive' },
      { id: 'fpds', name: 'FPDS.gov', enabled: true, status: 'inactive' },
      { id: 'dc-contracts', name: 'DC Contracts', enabled: true, status: 'inactive' },
    ],
    createdAt: new Date(),
  }, { merge: true });
  console.log('✅ Solicitation data sources created');

  console.log('\n✅ Schema deployment complete!');
}

async function createSuperAdmin() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👑 STEP 2: Creating SuperAdmin User');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const email = 'brianstittsr@gmail.com';
  const name = 'Brian Stitt';

  let user;
  try {
    user = await auth.getUserByEmail(email);
    console.log(`✅ User already exists: ${user.uid}`);
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      user = await auth.createUser({
        email,
        displayName: name,
        emailVerified: true,
      });
      console.log(`✅ Created Firebase Auth user: ${user.uid}`);
    } else {
      throw error;
    }
  }

  await auth.setCustomUserClaims(user.uid, {
    role: 'superadmin',
    admin: true,
    superadmin: true,
  });
  console.log('✅ Set custom claims: role=superadmin');

  await db.collection('teamMembers').doc(user.uid).set({
    email,
    firstName: 'Brian',
    lastName: 'Stitt',
    role: 'superadmin',
    status: 'active',
    firebaseUid: user.uid,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, { merge: true });
  console.log('✅ Created TeamMember document');

  console.log(`\n🎉 ${name} is now a SuperAdmin!`);
}

async function createAdmin() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⚙️  STEP 3: Creating Admin User');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const email = 'sblackman@itmcsolutions.com';
  const name = 'Sheyla Blackman';

  let user;
  try {
    user = await auth.getUserByEmail(email);
    console.log(`✅ User already exists: ${user.uid}`);
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      user = await auth.createUser({
        email,
        displayName: name,
        emailVerified: true,
      });
      console.log(`✅ Created Firebase Auth user: ${user.uid}`);
    } else {
      throw error;
    }
  }

  await auth.setCustomUserClaims(user.uid, {
    role: 'admin',
    admin: true,
  });
  console.log('✅ Set custom claims: role=admin');

  await db.collection('teamMembers').doc(user.uid).set({
    email,
    firstName: 'Sheyla',
    lastName: 'Blackman',
    role: 'admin',
    title: 'CEO',
    status: 'active',
    firebaseUid: user.uid,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, { merge: true });
  console.log('✅ Created TeamMember document');

  console.log(`\n🎉 ${name} is now an Admin!`);
}

async function deployAll() {
  try {
    console.log('\n╔═══════════════════════════════════════════╗');
    console.log('║   ITMC Solutions Platform Deployment     ║');
    console.log('╚═══════════════════════════════════════════╝');

    await deploySchema();
    await createSuperAdmin();
    await createAdmin();

    console.log('\n╔═══════════════════════════════════════════╗');
    console.log('║         🎉 DEPLOYMENT COMPLETE! 🎉        ║');
    console.log('╚═══════════════════════════════════════════╝\n');

    console.log('✅ Firestore schema deployed');
    console.log('✅ SuperAdmin created: brianstittsr@gmail.com');
    console.log('✅ Admin created: sblackman@itmcsolutions.com');
    
    console.log('\n📋 Next Steps:');
    console.log('1. Sign in to the platform with either account');
    console.log('2. Configure API keys in Settings');
    console.log('3. Set up feature visibility (SuperAdmin only)');
    console.log('4. Start using the platform!\n');

  } catch (error) {
    console.error('\n❌ Deployment failed:', error);
    throw error;
  }
}

// Run the deployment
deployAll()
  .then(() => {
    console.log('✅ All deployment scripts completed successfully\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  });
