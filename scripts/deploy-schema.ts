/**
 * Script to deploy Firestore schema and initial data
 * 
 * Usage: npx tsx scripts/deploy-schema.ts
 * 
 * This script creates the necessary Firestore collections and initial documents
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
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

const db = getFirestore();

async function deploySchema() {
  try {
    console.log('🚀 Starting Firestore schema deployment...\n');

    // 1. Create platformSettings collection with default settings
    console.log('📝 Creating platformSettings collection...');
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
      webhookEvents: {},
      notificationSettings: {
        syncWithMattermost: true,
        inAppEnabled: true,
        browserEnabled: false,
        soundEnabled: false,
      },
      socialLinks: {
        linkedin: { url: '', visible: true },
        twitter: { url: '', visible: true },
        youtube: { url: '', visible: true },
        facebook: { url: '', visible: false },
        instagram: { url: '', visible: false },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }, { merge: true });
    console.log('✅ Platform settings created');

    // 2. Create featureVisibility settings
    console.log('📝 Creating feature visibility settings...');
    await db.collection('platformSettings').doc('featureVisibility').set({
      features: [
        // Main Navigation
        { id: "command-center", name: "Command Center", description: "Dashboard and overview", category: "main", visible: true },
        { id: "opportunities", name: "Opportunities", description: "Business opportunities tracking", category: "main", visible: true },
        { id: "projects", name: "Projects", description: "Project management", category: "main", visible: true },
        { id: "affiliates", name: "Affiliates", description: "Affiliate network management", category: "main", visible: true },
        { id: "customers", name: "Customers", description: "Customer relationship management", category: "main", visible: true },
        
        // Work Items
        { id: "gov-solicitations", name: "Gov Solicitations", description: "Government contract opportunities", category: "work", visible: true },
        { id: "apollo-search", name: "Apollo Search", description: "Contact and company search", category: "work", visible: true, requiresSubscription: true },
        { id: "supplier-search", name: "Supplier Search", description: "Supplier database search", category: "work", visible: true, requiresSubscription: true },
        { id: "documents", name: "Documents", description: "Document management", category: "work", visible: true },
        { id: "calendar", name: "Calendar", description: "Calendar and scheduling", category: "work", visible: true },
        { id: "availability", name: "Availability", description: "Team availability tracking", category: "work", visible: true },
        { id: "meetings", name: "Meetings", description: "Meeting management", category: "work", visible: true },
        { id: "rocks", name: "Rocks", description: "EOS Rocks tracking", category: "work", visible: true },
        { id: "networking", name: "Networking", description: "Professional networking", category: "work", visible: true },
        { id: "deals", name: "Deals", description: "Deal pipeline management", category: "work", visible: true },
        { id: "linkedin-content", name: "LinkedIn Content", description: "LinkedIn content creation", category: "work", visible: true },
        { id: "eos2", name: "EOS2 Dashboard", description: "EOS traction tools", category: "work", visible: true },
        { id: "docuseal", name: "DocuSeal", description: "Document signing", category: "work", visible: true },
        { id: "bug-tracker", name: "Bug Tracker", description: "Issue tracking", category: "work", visible: true },
        
        // AI Tools
        { id: "ai-workforce", name: "AI Workforce", description: "AI agent management", category: "ai", visible: true, requiresSubscription: true },
        { id: "proposals", name: "Proposal Creator", description: "AI-powered proposal generation", category: "ai", visible: true, requiresSubscription: true },
        { id: "ask", name: "Ask AI", description: "AI assistant", category: "ai", visible: true },
        
        // Admin
        { id: "team-members", name: "Team Members", description: "User management", category: "admin", visible: true },
        { id: "strategic-partners", name: "Strategic Partners", description: "Partner management", category: "admin", visible: true },
        { id: "gohighlevel", name: "GoHighLevel", description: "CRM integration", category: "admin", visible: true, requiresSubscription: true },
        { id: "platform-settings", name: "Platform Settings", description: "System configuration", category: "admin", visible: true },
        
        // Initiatives
        { id: "initiatives", name: "Initiatives", description: "Strategic initiatives", category: "initiatives", visible: true },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, { merge: true });
    console.log('✅ Feature visibility settings created');

    // 3. Create solicitation data sources configuration
    console.log('📝 Creating solicitation data sources...');
    await db.collection('platformSettings').doc('solicitationSources').set({
      sources: [
        {
          id: 'sam-gov',
          name: 'SAM.gov',
          description: 'System for Award Management - Federal contract opportunities',
          url: 'https://sam.gov',
          enabled: true,
          requiresAuth: true,
          apiKeyConfigured: false,
          status: 'inactive',
        },
        {
          id: 'fpds',
          name: 'FPDS.gov',
          description: 'Federal Procurement Data System - Contract awards and modifications',
          url: 'https://www.fpds.gov',
          enabled: true,
          requiresAuth: false,
          apiKeyConfigured: true,
          status: 'inactive',
        },
        {
          id: 'dc-contracts',
          name: 'DC Contracts',
          description: 'Washington DC government contract opportunities',
          url: 'https://contracts.ocp.dc.gov',
          enabled: true,
          requiresAuth: false,
          apiKeyConfigured: true,
          status: 'inactive',
        },
        {
          id: 'grants-gov',
          name: 'Grants.gov',
          description: 'Federal grant opportunities',
          url: 'https://grants.gov',
          enabled: false,
          requiresAuth: true,
          apiKeyConfigured: false,
          status: 'inactive',
        },
        {
          id: 'usaspending',
          name: 'USAspending.gov',
          description: 'Federal spending data and contract awards',
          url: 'https://usaspending.gov',
          enabled: false,
          requiresAuth: true,
          apiKeyConfigured: false,
          status: 'inactive',
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, { merge: true });
    console.log('✅ Solicitation data sources created');

    // 4. Ensure required collections exist (create empty if needed)
    const collections = [
      'teamMembers',
      'organizations',
      'opportunities',
      'projects',
      'customers',
      'affiliates',
      'documents',
      'meetings',
      'rocks',
      'deals',
      'activities',
      'notifications',
    ];

    console.log('\n📝 Ensuring required collections exist...');
    for (const collectionName of collections) {
      const snapshot = await db.collection(collectionName).limit(1).get();
      if (snapshot.empty) {
        // Create a placeholder document that can be deleted later
        await db.collection(collectionName).doc('_placeholder').set({
          _placeholder: true,
          createdAt: new Date(),
        });
        console.log(`✅ Created ${collectionName} collection`);
      } else {
        console.log(`✓ ${collectionName} collection already exists`);
      }
    }

    console.log('\n✨ Schema deployment complete!\n');
    console.log('Next steps:');
    console.log('1. Run: npx tsx scripts/add-superadmin.ts');
    console.log('2. Run: npx tsx scripts/add-admin.ts');
    console.log('3. Configure API keys in Settings');
    
  } catch (error) {
    console.error('❌ Error deploying schema:', error);
    throw error;
  }
}

// Run the script
deploySchema()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
