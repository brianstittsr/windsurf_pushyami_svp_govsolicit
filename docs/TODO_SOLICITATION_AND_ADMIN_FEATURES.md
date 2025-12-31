# TODO: Solicitation Migration & Admin-Only Features

## Status Summary

### ✅ Solicitation Migration - PARTIALLY COMPLETE
The core solicitation search infrastructure has been deployed:
- ✅ Type definitions (`lib/procurement/types.ts`, `lib/procurement/platforms.ts`)
- ✅ Platform connectors (SAM.gov, DC Contracts, FPDS)
- ✅ Multi-platform aggregation service
- ✅ API route (`app/api/solicitations/search/route.ts`)
- ✅ Client hook (`hooks/useSolicitationSearch.ts`)
- ✅ UI pages (public and admin)
- ✅ Dependencies installed (`axios`, `fast-xml-parser`)

### ⚠️ Solicitation Migration - REMAINING TASKS

#### 1. Environment Configuration
- [ ] Verify `.env.local` exists with `SAM_GOV_API_KEY`
- [ ] Document required environment variables in README
- [ ] Add `.env.example` file with placeholder values

#### 2. Testing & Validation
- [ ] Test `POST /api/solicitations/search` endpoint locally
- [ ] Verify SAM.gov API integration works with real API key
- [ ] Test DC Contracts public endpoint integration
- [ ] Test FPDS Atom feed parsing
- [ ] Verify multi-platform aggregation and deduplication
- [ ] Test `/solicitations` public page renders results
- [ ] Test `/portal/admin/government-solicitations` admin page

#### 3. Error Handling & Logging
- [ ] Add comprehensive error handling to all platform connectors
- [ ] Implement request/response logging for debugging
- [ ] Add rate limiting protection for API endpoints
- [ ] Add timeout handling for slow external APIs

#### 4. UI/UX Enhancements
- [ ] Add loading states and skeleton screens
- [ ] Implement pagination for large result sets
- [ ] Add advanced filtering UI (date ranges, NAICS codes, agencies)
- [ ] Add export functionality (CSV, PDF)
- [ ] Add bookmark/save solicitation feature
- [ ] Implement result sorting options

#### 5. Schema Integration
- [ ] Add solicitation tracking to Firestore schema
- [ ] Create collection for saved/bookmarked solicitations
- [ ] Add user preferences for solicitation alerts
- [ ] Implement notification system for new matching solicitations

#### 6. Documentation
- [ ] Create user guide for solicitation search
- [ ] Document API endpoint usage
- [ ] Add inline code documentation
- [ ] Create troubleshooting guide

---

## 🔒 Admin-Only Features Implementation

### Objective
Restrict the following features to admin users only:
1. Rocks collection (EOS2)
2. Platform Settings
3. Apollo contacts/lists
4. ThomasNet suppliers/lists
5. GoHighLevel integrations
6. Traction/EOS2 collections
7. Mattermost playbooks

### Implementation Tasks

#### Phase 1: User Role Infrastructure
- [ ] Verify `UserRole` type includes 'admin' (✅ Already exists in `types/index.ts`)
- [ ] Create `useAuth` or `useUserRole` hook to check admin status
- [ ] Add `isAdmin()` helper function in user context
- [ ] Update `UserProfileContext` to expose admin check method

#### Phase 2: Firestore Security Rules
**File: `firestore.rules`**

- [ ] Update Rocks collection rules to require admin role
  ```
  match /rocks/{rockId} {
    allow read: if isAuthenticated() && isAdmin();
    allow write: if isAuthenticated() && isAdmin();
  }
  ```

- [ ] Update Platform Settings rules to require admin role
  ```
  match /platformSettings/{settingsId} {
    allow read: if isAuthenticated() && isAdmin();
    allow write: if isAuthenticated() && isAdmin();
  }
  ```

- [ ] Update Apollo collections rules
  ```
  match /apolloPurchasedContacts/{contactId} {
    allow read, write: if isAuthenticated() && isAdmin();
  }
  match /apolloSavedLists/{listId} {
    allow read, write: if isAuthenticated() && isAdmin();
  }
  ```

- [ ] Update ThomasNet collections rules
  ```
  match /thomasnetSavedSuppliers/{supplierId} {
    allow read, write: if isAuthenticated() && isAdmin();
  }
  match /thomasnetSavedLists/{listId} {
    allow read, write: if isAuthenticated() && isAdmin();
  }
  ```

- [ ] Update GoHighLevel collections rules
  ```
  match /gohighlevelIntegrations/{integrationId} {
    allow read, write: if isAuthenticated() && isAdmin();
  }
  ```

- [ ] Update Traction/EOS2 collections rules
  ```
  match /tractionRocks/{rockId} {
    allow read, write: if isAuthenticated() && isAdmin();
  }
  match /tractionTodos/{todoId} {
    allow read, write: if isAuthenticated() && isAdmin();
  }
  match /tractionMetrics/{metricId} {
    allow read, write: if isAuthenticated() && isAdmin();
  }
  match /tractionIssues/{issueId} {
    allow read, write: if isAuthenticated() && isAdmin();
  }
  match /tractionMeetings/{meetingId} {
    allow read, write: if isAuthenticated() && isAdmin();
  }
  match /tractionTeam/{teamId} {
    allow read, write: if isAuthenticated() && isAdmin();
  }
  ```

- [ ] Update Mattermost Playbooks rules
  ```
  match /mattermostPlaybooks/{playbookId} {
    allow read, write: if isAuthenticated() && isAdmin();
  }
  ```

- [ ] Add helper function in firestore.rules
  ```
  function isAdmin() {
    return isAuthenticated() && 
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
  }
  ```

#### Phase 3: UI/Navigation Updates
**File: `components/portal/portal-sidebar.tsx`**

- [ ] Add admin check to conditionally render "Rocks" menu item
- [ ] Hide Apollo Search from non-admins
- [ ] Hide Supplier Search (ThomasNet) from non-admins
- [ ] Hide GoHighLevel menu item from non-admins
- [ ] Hide EOS2 Dashboard from non-admins
- [ ] Filter admin section items based on role
- [ ] Add visual indicator for admin-only features

#### Phase 4: Page-Level Protection
- [ ] Add admin check to `/portal/rocks/page.tsx`
- [ ] Add admin check to `/portal/apollo-search/page.tsx`
- [ ] Add admin check to `/portal/supplier-search/page.tsx`
- [ ] Add admin check to `/portal/gohighlevel/page.tsx`
- [ ] Add admin check to `/portal/eos2/page.tsx`
- [ ] Add admin check to all Traction/EOS2 related pages
- [ ] Create reusable `AdminOnly` wrapper component
- [ ] Add 403 Forbidden page for unauthorized access
- [ ] Redirect non-admins to dashboard with toast notification

#### Phase 5: API Route Protection
- [ ] Protect Apollo API routes with admin check
- [ ] Protect ThomasNet API routes with admin check
- [ ] Protect GoHighLevel API routes with admin check
- [ ] Protect EOS2 API routes with admin check
- [ ] Add middleware for admin-only API routes
- [ ] Return 403 status for unauthorized API requests

#### Phase 6: Component-Level Guards
- [ ] Create `<AdminGuard>` component for conditional rendering
- [ ] Update forms that write to admin-only collections
- [ ] Add permission checks to data mutation hooks
- [ ] Disable admin-only buttons/actions for non-admins

#### Phase 7: Testing
- [ ] Test admin user can access all features
- [ ] Test non-admin user cannot see admin-only menu items
- [ ] Test non-admin user gets 403 on direct URL access
- [ ] Test Firestore rules reject non-admin writes
- [ ] Test API routes reject non-admin requests
- [ ] Test role changes are reflected immediately
- [ ] Verify no console errors for permission checks

#### Phase 8: Documentation
- [ ] Document admin-only features in user guide
- [ ] Create admin user management guide
- [ ] Document how to grant/revoke admin access
- [ ] Add security best practices documentation

---

## Priority Order

### High Priority (Complete First)
1. **Firestore Security Rules** - Critical security issue
2. **Page-Level Protection** - Prevent unauthorized access
3. **API Route Protection** - Secure backend endpoints

### Medium Priority
4. **UI/Navigation Updates** - Improve UX
5. **Solicitation Testing** - Validate existing implementation
6. **Environment Configuration** - Deployment readiness

### Low Priority
7. **UI/UX Enhancements** - Nice to have features
8. **Documentation** - Long-term maintenance

---

## Notes

- The solicitation search feature is **90% complete** - mainly needs testing and validation
- Admin-only feature restriction is a **security priority** and should be implemented ASAP
- Current Firestore rules have all collections open with `allow read, write: if true` which is a **major security vulnerability**
- User role system already exists (`UserRole` type with 'admin' option)
- Need to implement role checking infrastructure across the application

---

## Estimated Effort

- **Solicitation Migration Completion**: 4-6 hours
- **Admin-Only Features Implementation**: 12-16 hours
- **Total**: 16-22 hours

---

## Dependencies

- Firebase Admin SDK (for server-side role verification)
- User authentication system (already in place)
- User profile context (already in place)
