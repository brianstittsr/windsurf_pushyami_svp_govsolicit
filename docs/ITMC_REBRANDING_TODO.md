# ITMC Solutions Complete Rebranding TODO List

**Created:** December 30, 2024  
**Status:** In Progress

---

## 🎨 Theme & Colors

- [x] Update `app/globals.css` with ITMC professional blue color scheme
  - Primary: #0066cc (professional blue)
  - Secondary: #003d7a (navy blue)
  - Background: Clean white (#ffffff)
  - Sidebar: Dark slate (#1e293b)

---

## 🔍 Find & Replace All Branding References

### Strategic Value Plus References (105 matches in 42 files)
- [ ] `components/seo/json-ld.tsx` (7 matches)
- [ ] `app/(portal)/portal/admin/initiatives/tbmnc/page.tsx` (5 matches)
- [ ] `app/onboarding/client/page.tsx` (5 matches)
- [ ] `app/terms/page.tsx` (5 matches)
- [ ] `app/privacy/page.tsx` (4 matches)
- [ ] `app/sign-up/page.tsx` (4 matches)
- [ ] `app/(marketing)/accessibility/page.tsx` (3 matches)
- [ ] `components/marketing/testimonials.tsx` (2 matches)
- [ ] `components/portal/portal-sidebar.tsx` (2 matches)
- [ ] `components/shared/navbar.tsx` (2 matches)
- [ ] `app/manifest.ts` (2 matches)
- [ ] `app/sign-in/page.tsx` (2 matches)
- [ ] `app/forgot-password/page.tsx` (2 matches)
- [ ] `lib/docuseal.ts` (3 matches)
- [ ] `lib/schema.ts` (1 match)
- [ ] `types/index.ts` (1 match)
- [ ] All other component files with references

### V+ / EDGE™ Product References
- [ ] Search for "V+ EDGE" and replace with ITMC service names
- [ ] Search for "TwinEDGE" and replace with appropriate ITMC service
- [ ] Search for "IntellEDGE" and replace with appropriate ITMC service
- [ ] Update all product-specific routes and links

---

## 📄 Marketing Pages Content Transfer

### Core Pages
- [x] Homepage (`app/(marketing)/page.tsx`)
  - [x] Hero carousel updated
  - [x] Services overview updated
  - [x] Stats section updated
- [x] About page (`app/(marketing)/about/page.tsx`)
- [x] Company/Team page (`app/(marketing)/company/page.tsx`)
- [x] Contact page (`app/(marketing)/contact/page.tsx`)

### Missing ITMC Website Pages to Transfer
- [ ] **Services Detail Pages**
  - [ ] Strategic Planning page
  - [ ] CPIC/Portfolio Management page
  - [ ] Technology Business Management (TBM) page
  - [ ] Data Analytics & Reporting page
  - [ ] Solution & Data Architecture page
  - [ ] Intelligent Automation & Low-Code page
  - [ ] Program/Project Management page

- [ ] **Case Studies / Success Stories**
  - [ ] HUD project case study
  - [ ] DHS project case study
  - [ ] DOD project case study
  - [ ] Other federal agency success stories

- [ ] **Resources Section**
  - [ ] Blog posts (if any from ITMC site)
  - [ ] White papers
  - [ ] Guides & playbooks for federal IT
  - [ ] Webinars/events

- [ ] **Certifications Page**
  - [ ] SBA 8(a) certification details
  - [ ] Veteran-owned certification
  - [ ] Woman-owned certification
  - [ ] Minority-owned certification
  - [ ] GSA MAS Contract details
  - [ ] SWAM certification
  - [ ] NAICS codes

---

## 🖼️ Images & Logos

### Logo Files to Update
- [ ] Replace `/VPlus_logo.webp` with ITMC logo
- [ ] Update favicon files
  - [ ] `/favicon.ico`
  - [ ] `/icon.png`
  - [ ] `/apple-icon.png`
- [ ] Update Open Graph image (`/og-image.png`)
- [ ] Update Twitter Card image

### Team Photos
- [ ] Add Sheyla Blackman CEO photo
- [ ] Add Tiffany Byers COO photo
- [ ] Add Stacye Williams HR Manager photo

### Marketing Images
- [ ] Replace all manufacturing-related images
- [ ] Add federal government/IT consulting imagery
- [ ] Add client logo images (HUD, DHS, TSA, DOD, etc.)
- [ ] Add certification badge images

---

## 🔗 Navigation & Links

- [x] Footer links updated (`components/shared/footer.tsx`)
- [ ] Header/Navbar component (`components/shared/navbar.tsx`)
  - [ ] Update logo
  - [ ] Update navigation menu items
  - [ ] Update mobile menu
- [ ] Update all internal route references from old service names to ITMC services

---

## 📱 Components to Update

### Marketing Components
- [x] `components/marketing/hero-carousel.tsx`
- [x] `components/marketing/services-overview.tsx`
- [x] `components/marketing/stats-section.tsx`
- [ ] `components/marketing/testimonials.tsx` - Update with federal client testimonials
- [ ] `components/marketing/how-it-works.tsx` - Update process for federal IT consulting
- [ ] `components/marketing/cta-section.tsx` - Update CTA messaging
- [ ] `components/marketing/leadership-team.tsx` - Update with ITMC leadership
- [ ] `components/marketing/contact-popup.tsx` - Update messaging

### SEO Components
- [ ] `components/seo/json-ld.tsx` - Update structured data

---

## 🔐 Authentication & Portal

### Unauthenticated Admin Preview Link
- [ ] Create `/admin-preview` route or similar
- [ ] Add link in footer or header for demo purposes
- [ ] Implement read-only view of admin dashboard
- [ ] Add clear "Demo Mode" indicator

### Auth Pages
- [ ] `app/sign-in/page.tsx` - Update branding
- [ ] `app/sign-up/page.tsx` - Update branding
- [ ] `app/forgot-password/page.tsx` - Update branding
- [ ] `app/onboarding/client/page.tsx` - Update for federal clients

---

## 📋 Legal & Policy Pages

- [ ] `app/terms/page.tsx` - Update company name and terms
- [ ] `app/privacy/page.tsx` - Update company name and privacy policy
- [ ] `app/(marketing)/accessibility/page.tsx` - Update company references

---

## 🗄️ Database & Schema

- [ ] `lib/schema.ts` - Update any company-specific fields
- [ ] `types/index.ts` - Update type definitions if needed
- [ ] Review Firestore collections for old branding data

---

## 📊 Portal/Dashboard Updates

- [ ] `components/portal/portal-sidebar.tsx` - Update branding
- [ ] Update all portal page headers with ITMC branding
- [ ] Review admin pages for old branding references

---

## 🌐 Metadata & SEO

- [x] `app/layout.tsx` - Root layout metadata updated
- [ ] `app/manifest.ts` - Update PWA manifest
- [ ] Update all page-specific metadata
- [ ] Update sitemap if exists
- [ ] Update robots.txt if needed

---

## 📚 Documentation Files

### Keep for Reference (Update Company Name)
- [ ] `README.md` - Update project description
- [ ] `docs/REBRANDING_SUMMARY.md` - Already created
- [ ] `docs/IMPLEMENTATION_SUMMARY.md` - Update references

### Archive Old SVP Docs
- [ ] Move `docs/SVP_*.md` files to archive folder
- [ ] Move `docs/BusinessAnalysis_Dec2025*.md` to archive
- [ ] Keep for historical reference but mark as archived

---

## ✅ Testing Checklist

### Visual Testing
- [ ] Homepage displays correctly with ITMC branding
- [ ] All navigation links work
- [ ] Footer displays correct contact info
- [ ] Color scheme is consistent across all pages
- [ ] Mobile responsive design works

### Content Testing
- [ ] No "Strategic Value Plus" text visible anywhere
- [ ] No "V+ EDGE" or manufacturing references
- [ ] All contact information is ITMC's
- [ ] All certifications display correctly
- [ ] Team photos and bios are correct

### Functional Testing
- [ ] All forms submit correctly
- [ ] Contact form sends to contact@itmcsolutions.com
- [ ] Authentication flows work
- [ ] Admin preview link accessible
- [ ] All internal links resolve correctly

### SEO Testing
- [ ] Page titles are correct
- [ ] Meta descriptions are accurate
- [ ] Open Graph tags work
- [ ] Structured data is valid
- [ ] Sitemap is updated

---

## 🚀 Deployment Checklist

- [ ] Update environment variables
- [ ] Update domain configuration
- [ ] Update SSL certificates if needed
- [ ] Test on staging environment
- [ ] Deploy to production
- [ ] Verify DNS settings
- [ ] Test production site thoroughly

---

## 📝 Content from ITMC Website to Transfer

### Homepage Content
- [x] Hero messaging
- [x] Service overview
- [x] Statistics
- [ ] Client logos section
- [ ] Testimonials from federal clients

### About Page Content
- [x] Company history (founded 2010)
- [x] Mission statement
- [x] Core values
- [x] Team leadership bios
- [ ] Detailed team photos
- [ ] Company timeline

### Services Pages Content
- [ ] Detailed service descriptions for each offering
- [ ] Service delivery methodology
- [ ] Case studies per service
- [ ] Pricing/engagement models (if applicable)

### Contact Page Content
- [x] Contact form
- [x] Email: contact@itmcsolutions.com
- [x] Phone: (757) 284-3986
- [x] Address: 100 7th St., Suite 104, Portsmouth, VA 23704
- [x] LinkedIn link
- [ ] Office hours
- [ ] Map/directions

---

## 🔄 Priority Order

### Phase 1: Critical Branding (CURRENT)
1. [x] Theme colors
2. [ ] Find/replace all "Strategic Value Plus" references
3. [ ] Update navbar/header
4. [ ] Update all visible marketing pages
5. [ ] Add admin preview link

### Phase 2: Content Transfer
1. [ ] Transfer all ITMC website pages
2. [ ] Update images and logos
3. [ ] Add team photos
4. [ ] Update testimonials

### Phase 3: Polish & Testing
1. [ ] Legal pages
2. [ ] Documentation
3. [ ] Comprehensive testing
4. [ ] SEO optimization

### Phase 4: Deployment
1. [ ] Staging deployment
2. [ ] Production deployment
3. [ ] Post-deployment verification

---

## 📞 ITMC Solutions Contact Information

**Company:** ITMC Solutions, LLC  
**Email:** contact@itmcsolutions.com  
**Phone:** (757) 284-3986  
**Address:** 100 7th St., Suite 104, Portsmouth, VA 23704  
**Website:** https://www.itmcsolutions.com  
**LinkedIn:** https://www.linkedin.com/company/itmc-solutions

**Certifications:**
- SBA 8(a) Certified
- Veteran-owned
- Woman-owned
- Minority-owned
- SWAM: #69476
- GSA MAS Contract: 47QTCA23D004X

**NAICS Codes:** 541611, 541511, 541512, 541519, 541618, 611420, 611430

---

**Last Updated:** December 30, 2024  
**Progress:** ~40% Complete
