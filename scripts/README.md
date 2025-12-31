# Admin Scripts

This directory contains administrative scripts for managing users and system configuration.

## Prerequisites

1. **Install tsx** (TypeScript execution):
   ```bash
   npm install -g tsx
   ```

2. **Set up Firebase Admin credentials** in `.env.local`:
   ```bash
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

3. **Get Firebase Admin credentials**:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Extract the values for the environment variables above

## Available Scripts

### Add SuperAdmin

Adds `brianstittsr@gmail.com` as a SuperAdmin user with full system control.

```bash
npx tsx scripts/add-superadmin.ts
```

**What it does:**
- Creates or updates Firebase Auth user
- Sets custom claims: `role=superadmin`, `admin=true`, `superadmin=true`
- Creates/updates TeamMember document in Firestore
- Verifies the setup

**Permissions granted:**
- Complete system control
- Can hide/show features
- Can manage all users including Admins
- Access to billing and subscriptions

---

### Add Admin

Adds `sblackman@itmcsolutions.com` as an Admin user.

```bash
npx tsx scripts/add-admin.ts
```

**What it does:**
- Creates or updates Firebase Auth user
- Sets custom claims: `role=admin`, `admin=true`
- Creates/updates TeamMember document in Firestore with CEO title
- Verifies the setup

**Permissions granted:**
- Manage users (except SuperAdmins)
- Access all enabled features
- Configure organization settings
- Access admin-only features (Rocks, EOS2, Apollo, ThomasNet, GoHighLevel)

---

## Running Scripts

### Option 1: Using npx (Recommended)
```bash
npx tsx scripts/add-superadmin.ts
npx tsx scripts/add-admin.ts
```

### Option 2: Using Node with ts-node
```bash
npm install -D ts-node
npx ts-node scripts/add-superadmin.ts
npx ts-node scripts/add-admin.ts
```

### Option 3: Add to package.json scripts
Add to `package.json`:
```json
{
  "scripts": {
    "add-superadmin": "tsx scripts/add-superadmin.ts",
    "add-admin": "tsx scripts/add-admin.ts"
  }
}
```

Then run:
```bash
npm run add-superadmin
npm run add-admin
```

---

## Troubleshooting

### Error: "Cannot find module 'firebase-admin'"
```bash
npm install firebase-admin
```

### Error: "FIREBASE_PROJECT_ID is not defined"
Make sure your `.env.local` file has all required Firebase Admin credentials.

### Error: "Insufficient permissions"
Ensure your Firebase service account has the following roles:
- Firebase Admin SDK Administrator Service Agent
- Firebase Authentication Admin

### Error: "User already exists"
The script will update the existing user's role. This is expected behavior.

---

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit `.env.local`** - It contains sensitive credentials
2. **Limit SuperAdmin access** - Only assign to trusted individuals
3. **Use service account keys securely** - Rotate them periodically
4. **Run scripts in secure environment** - Don't run on shared machines
5. **Audit role changes** - Log all SuperAdmin and Admin assignments

---

## Verification

After running the scripts, verify the users in:

1. **Firebase Console:**
   - Go to Authentication → Users
   - Find the user by email
   - Check custom claims in the user details

2. **Firestore Console:**
   - Go to Firestore Database
   - Navigate to `teamMembers` collection
   - Find the document by user UID
   - Verify `role` field is set correctly

3. **Application:**
   - Sign in with the user credentials
   - Verify access to admin features
   - Check that role-based permissions work correctly

---

## Role Hierarchy

```
SuperAdmin (brianstittsr@gmail.com)
    ↓
Admin (sblackman@itmcsolutions.com)
    ↓
Other users...
```

See `docs/ROLE_SYSTEM.md` for complete role documentation.

---

## Support

For issues or questions:
- Technical: See `docs/ROLE_SYSTEM.md`
- Security: Contact security@itmcsolutions.com
- General: Contact contact@itmcsolutions.com
