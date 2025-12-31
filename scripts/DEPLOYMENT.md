# Firebase Deployment Guide

Complete guide for deploying the ITMC Solutions platform to Firebase.

---

## Prerequisites

### 1. Install Dependencies
```bash
npm install firebase-admin
npm install -g tsx
```

### 2. Get Firebase Admin Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** → **Service Accounts**
4. Click **"Generate new private key"**
5. Download the JSON file

### 3. Configure Environment Variables

Create or update `.env.local` with your Firebase credentials:

```bash
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
```

**Important:** Keep the quotes around `FIREBASE_PRIVATE_KEY` and preserve the `\n` characters.

---

## Deployment Options

### Option 1: Deploy Everything (Recommended)

Run the master deployment script that does everything:

```bash
npx tsx scripts/deploy-all.ts
```

This will:
1. ✅ Deploy Firestore schema
2. ✅ Create SuperAdmin user (brianstittsr@gmail.com)
3. ✅ Create Admin user (sblackman@itmcsolutions.com)

### Option 2: Deploy Step-by-Step

If you prefer to run each step individually:

#### Step 1: Deploy Schema
```bash
npx tsx scripts/deploy-schema.ts
```

#### Step 2: Create SuperAdmin
```bash
npx tsx scripts/add-superadmin.ts
```

#### Step 3: Create Admin
```bash
npx tsx scripts/add-admin.ts
```

---

## What Gets Deployed

### 1. Firestore Collections

**platformSettings/global**
- Integration configurations (Mattermost, Apollo, GoHighLevel, Zoom, DocuSeal)
- LLM configuration (OpenAI, Anthropic, etc.)
- Webhook events
- Notification settings
- Social links

**platformSettings/featureVisibility**
- Feature toggle settings for SuperAdmin
- Controls which features appear in navigation
- Organized by category (main, work, ai, admin, initiatives)

**platformSettings/solicitationSources**
- Government contract data sources
- SAM.gov, FPDS, DC Contracts, Grants.gov, USAspending
- API configuration and status

**Core Collections** (created if they don't exist):
- teamMembers
- organizations
- opportunities
- projects
- customers
- affiliates
- documents
- meetings
- rocks
- deals
- activities
- notifications

### 2. User Accounts

**SuperAdmin: brianstittsr@gmail.com**
- Role: `superadmin`
- Custom claims: `{ role: 'superadmin', admin: true, superadmin: true }`
- Full system control
- Can hide/show features
- Can manage all users

**Admin: sblackman@itmcsolutions.com**
- Role: `admin`
- Title: CEO
- Custom claims: `{ role: 'admin', admin: true }`
- Organization management
- Cannot delete SuperAdmin

---

## Verification

### 1. Check Firebase Console

**Authentication:**
- Go to Firebase Console → Authentication → Users
- Verify both users are created
- Check custom claims in user details

**Firestore:**
- Go to Firebase Console → Firestore Database
- Verify `platformSettings` collection exists
- Check documents: `global`, `featureVisibility`, `solicitationSources`
- Verify `teamMembers` collection has user documents

### 2. Test Sign In

1. Go to your application: `http://localhost:3000/sign-in`
2. Sign in with either:
   - brianstittsr@gmail.com (SuperAdmin)
   - sblackman@itmcsolutions.com (Admin)
3. Verify you can access the portal
4. Check Settings → Feature Visibility (SuperAdmin only)

### 3. Verify Permissions

**SuperAdmin should see:**
- ✅ All navigation items
- ✅ Settings → Feature Visibility tab
- ✅ All admin features
- ✅ Ability to manage all users

**Admin should see:**
- ✅ All navigation items
- ✅ Admin features (Rocks, EOS2, etc.)
- ✅ Settings (but no Feature Visibility tab)
- ❌ Cannot access SuperAdmin-only features

---

## Troubleshooting

### Error: "Cannot find module 'firebase-admin'"
```bash
npm install firebase-admin
```

### Error: "FIREBASE_PROJECT_ID is not defined"
Make sure `.env.local` exists and has all required variables. Check that the file is in the project root.

### Error: "Insufficient permissions"
Ensure your Firebase service account has these roles:
- Firebase Admin SDK Administrator Service Agent
- Firebase Authentication Admin

### Error: "User already exists"
This is normal if you're re-running the scripts. The scripts will update existing users.

### Error: "Invalid private key"
Make sure your `FIREBASE_PRIVATE_KEY` in `.env.local`:
- Is wrapped in quotes
- Contains `\n` characters (not actual newlines)
- Includes the BEGIN and END markers

---

## Security Best Practices

### 1. Protect Credentials
- ✅ Never commit `.env.local` to git
- ✅ Add `.env.local` to `.gitignore`
- ✅ Rotate service account keys periodically
- ✅ Use different keys for dev/staging/production

### 2. Limit SuperAdmin Access
- ✅ Only assign SuperAdmin to 1-2 trusted individuals
- ✅ Enable 2FA for SuperAdmin accounts
- ✅ Log all SuperAdmin actions
- ✅ Review SuperAdmin access quarterly

### 3. Firestore Security
- ✅ Deploy Firestore security rules
- ✅ Test rules with Firebase emulator
- ✅ Monitor for unauthorized access attempts
- ✅ Enable audit logging

---

## Post-Deployment Tasks

### 1. Configure API Keys
Sign in as SuperAdmin and go to Settings:
- Add SAM.gov API key
- Configure Mattermost webhook
- Set up other integrations as needed

### 2. Set Feature Visibility
Go to Settings → Feature Visibility:
- Hide features not paid for
- Disable beta features
- Configure subscription-required features

### 3. Invite Team Members
- Create additional user accounts
- Assign appropriate roles
- Send welcome emails

### 4. Test Core Features
- Create test opportunity
- Create test project
- Test solicitation search
- Verify notifications work

---

## Rollback Procedure

If deployment fails or causes issues:

### 1. Restore Previous State
```bash
# Delete newly created documents
firebase firestore:delete platformSettings/global
firebase firestore:delete platformSettings/featureVisibility
firebase firestore:delete platformSettings/solicitationSources
```

### 2. Remove Users
```bash
# In Firebase Console → Authentication
# Delete the created users manually
```

### 3. Re-deploy
```bash
# Fix the issue, then re-run
npx tsx scripts/deploy-all.ts
```

---

## Production Deployment Checklist

Before deploying to production:

- [ ] Test deployment in staging environment
- [ ] Backup existing Firestore data
- [ ] Update Firestore security rules
- [ ] Configure production API keys
- [ ] Set up monitoring and alerts
- [ ] Test all critical user flows
- [ ] Verify role-based access control
- [ ] Document any custom configurations
- [ ] Train SuperAdmin on feature visibility
- [ ] Set up backup and disaster recovery

---

## Support

For deployment issues:
- **Technical:** See `scripts/README.md`
- **Security:** Contact security@itmcsolutions.com
- **General:** Contact contact@itmcsolutions.com

---

**Last Updated:** December 30, 2024  
**Version:** 1.0  
**Maintained By:** ITMC Solutions Development Team
