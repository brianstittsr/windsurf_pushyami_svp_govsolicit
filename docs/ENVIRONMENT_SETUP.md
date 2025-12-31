# Environment Configuration Guide

## Overview
This document outlines all required and optional environment variables for the SVP Platform.

## Required Environment Variables

### Firebase Configuration
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Government Solicitation Search (Server-side only)
```bash
# SAM.gov API Key - Required for federal solicitation search
SAM_GOV_API_KEY=your_sam_gov_api_key

# DC Contracts API Key - Optional (public endpoint doesn't require key)
DC_CONTRACTS_API_KEY=optional_dc_contracts_key
```

**Important:** Do NOT prefix these with `NEXT_PUBLIC_` as they must remain server-side only.

## Optional Environment Variables

### OpenAI Integration
```bash
OPENAI_API_KEY=your_openai_api_key
```

### Apollo Integration (Admin Only)
```bash
APOLLO_API_KEY=your_apollo_api_key
```

### ThomasNet Integration (Admin Only)
```bash
THOMASNET_API_KEY=your_thomasnet_api_key
```

### GoHighLevel Integration (Admin Only)
```bash
GHL_API_KEY=your_gohighlevel_api_key
GHL_LOCATION_ID=your_location_id
```

### Mattermost Integration (Admin Only)
```bash
MATTERMOST_URL=https://your-mattermost-instance.com
MATTERMOST_TOKEN=your_mattermost_token
```

## Setup Instructions

### 1. Create Environment File
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 2. Configure Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to Project Settings > General
4. Copy the configuration values to your `.env.local`

### 3. Configure SAM.gov API Key
1. Register at [SAM.gov](https://sam.gov/content/api)
2. Request an API key
3. Add to `.env.local` as `SAM_GOV_API_KEY`

### 4. Verify Configuration
Run the development server to verify all environment variables are loaded:
```bash
npm run dev
```

## Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore` (already configured)
- Use `NEXT_PUBLIC_` prefix ONLY for client-side variables
- Store API keys server-side when possible
- Rotate API keys regularly
- Use different keys for development and production

### ❌ DON'T:
- Commit `.env.local` to version control
- Share API keys in chat, email, or documentation
- Use production keys in development
- Expose server-side API keys to the browser

## Environment Variable Reference

| Variable | Required | Scope | Purpose |
|----------|----------|-------|---------|
| `NEXT_PUBLIC_FIREBASE_*` | Yes | Client | Firebase SDK initialization |
| `SAM_GOV_API_KEY` | Yes* | Server | Federal solicitation search |
| `DC_CONTRACTS_API_KEY` | No | Server | DC government contracts |
| `OPENAI_API_KEY` | No | Server | AI features |
| `APOLLO_API_KEY` | No | Server | Contact search (admin) |
| `THOMASNET_API_KEY` | No | Server | Supplier search (admin) |
| `GHL_API_KEY` | No | Server | CRM integration (admin) |
| `MATTERMOST_*` | No | Server | Playbook integration (admin) |

*Required for solicitation search feature to work

## Troubleshooting

### Issue: "Firebase not initialized"
**Solution:** Verify all `NEXT_PUBLIC_FIREBASE_*` variables are set in `.env.local`

### Issue: "SAM.gov API returns 401"
**Solution:** Check that `SAM_GOV_API_KEY` is valid and not expired

### Issue: "Environment variables not loading"
**Solution:** 
1. Restart the development server
2. Verify `.env.local` exists in project root
3. Check for syntax errors in `.env.local`

### Issue: "API key exposed in browser"
**Solution:** Remove `NEXT_PUBLIC_` prefix from server-side API keys

## Deployment

### Vercel
Add environment variables in Project Settings > Environment Variables

### Other Platforms
Consult your platform's documentation for setting environment variables

## Support

For issues with environment configuration, contact the development team or refer to:
- [Next.js Environment Variables Documentation](https://nextjs.org/docs/basic-features/environment-variables)
- [Firebase Setup Guide](https://firebase.google.com/docs/web/setup)
