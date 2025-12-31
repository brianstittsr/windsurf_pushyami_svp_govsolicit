# FPDS Search Migration (Next.js + Tailwind/shadcn)

This guide is intended to be copied into a **target Next.js repo** to migrate the existing **FPDS Search** feature (UI + service + schema + parsing) from another application.

It is written to:
- Detect **App Router vs Pages Router** automatically from repo structure
- Use **TailwindCSS + shadcn/ui** (no MUI)
- Add a **server-side proxy** to avoid FPDS CORS issues
- Preserve the existing **FPDS schema** (50+ params) and **parsing breadth** (50+ extracted fields)

---

## 0) Preconditions

- You have access to the source feature’s code:
  - `FPDSSearch` page/component
  - `FPDSService` (or equivalent) that:
    - defines the schema
    - builds the FPDS ATOM query
    - fetches/parses XML
    - provides demo/mock fallback
    - persists search history
  - Optional: a contract details modal/form component

- You have a target **Next.js** repo where this will be migrated.

---

## 1) Determine Router Style (App Router vs Pages Router)

In the **target Next.js repo**, determine which routing system is in use:

- **App Router** if:
  - `app/` exists and contains `app/layout.(js|ts)x`

- **Pages Router** if:
  - `pages/` exists (e.g., `pages/index.(js|ts)x`)

**Rule:** If both exist, follow the repo’s current convention (usually where existing routes live).

---

## 2) Ensure TailwindCSS + shadcn/ui

### 2.1 Tailwind

If Tailwind is not present (no `tailwind.config.(js|ts)`):

- Install and configure Tailwind for Next.js per official docs.
- Ensure your global stylesheet imports Tailwind directives.

### 2.2 shadcn/ui

If shadcn is not present (no `components/ui/*` and no `components.json`):

- Initialize shadcn/ui and install dependencies.
- Add these shadcn components (minimum):
  - `button`, `input`, `label`, `select`, `textarea`
  - `accordion`, `dialog`, `table`, `badge`
  - Optional: `tabs`, `tooltip`

---

## 3) Add an FPDS Proxy API Route (Required)

### Why
Direct browser calls to FPDS ATOM feeds often fail due to CORS. You must route requests through the Next.js server.

### Route locations

- **App Router:** `app/api/fpds/route.ts`
- **Pages Router:** `pages/api/fpds.ts`

### Required behavior

- Accept incoming query params from the client.
- Build (or accept) the final FPDS ATOM feed URL.
- Fetch the ATOM feed server-side.
- Return the **raw XML** response (recommended for parity), or return parsed JSON (only if you intentionally move parsing server-side).

### Recommended API contract

Use a safe, structured approach:

- Client sends: `GET /api/fpds?<structuredParams>`
- API route builds the FPDS URL from params.

Alternative (simpler but less controlled):

- Client sends: `GET /api/fpds?url=<encodedFpdsUrl>`

**Note:** If you accept `url`, validate/allowlist the domain to prevent open-proxy risk.

---

## 4) Migrate FPDSService (Schema + Query Builder + Parser)

Port the source `FPDSService` module into the target repo under something like:

- `src/features/fpds/FPDSService.ts` (or `lib/fpds/FPDSService.ts`)

### 4.1 Must preserve schema + search features

Preserve the full search schema (50+ parameters), including these categories:

- **Basic**
  - agency/department/office
  - vendor name
  - PIID / contract number
  - NAICS
  - PSC
  - description keywords

- **Date range**
  - signed date start/end
  - modification date start/end

- **Financial**
  - min/max dollars

- **Location**
  - place of performance state/city
  - vendor location state/city

- **Contract type / competition / set-aside**
  - contract/action types
  - extent competed
  - offers received
  - set-aside type

- **Output controls**
  - max records
  - sort field + direction

### 4.2 Must preserve parsing breadth

Ensure parsing still extracts rich contract detail fields (often 50+), such as:

- Identifiers (contract ID/PIID/modification/transaction)
- Agency + office + funding details
- Vendor details (name, DUNS, address, contact)
- Financials (obligated/base+options/total values where present)
- Dates (signed/effective/completion)
- Classification (NAICS/PSC + descriptions if present)
- Competition + set-aside
- Place of performance (full address fields)
- Compliance/socioeconomic flags where present

Preserve helper methods (if present):

- numeric parsing helper (e.g., `getNumericValue`)
- fiscal year extraction helper (e.g., `extractFiscalYear`)
- currency/date formatting helper(s)

### 4.3 Transport change (mandatory)

Replace any direct fetch to FPDS.gov with calls to the proxy endpoint:

- `fetch('/api/fpds?...')`

Keep demo/mock fallback behavior:

- If proxy returns non-200 or parsing fails, return mock results and surface a UI banner/message: **“FPDS unavailable; showing demo results.”**

---

## 5) Migrate UI Page (Tailwind/shadcn)

### Route

- **App Router:**
  - `app/fpds-search/page.tsx` (server component wrapper)
  - put interactive UI in a client component, e.g. `components/fpds/FPDSSearchClient.tsx` with `"use client"`

- **Pages Router:**
  - `pages/fpds-search.tsx` (client by default)

### UI requirements

Implement the FPDS Search UI using shadcn components:

- `Accordion` for schema categories
- `Input` / `Select` / `Textarea` for fields
- `Button` for search + actions
- `Table` for results
- `Dialog` for:
  - Search history
  - Optional contract details modal

### Local storage

Search history uses `localStorage`, so it must run client-side:

- App Router: ensure code accessing `localStorage` is inside a client component

### Preserve functionality

- Loading and error states
- Search history persistence (save/search/re-run)
- CSV export for results
- Optional: “View Details” action opens a dialog with:
  - accordion sections
  - formatted currency/dates
  - JSON export

---

## 6) Acceptance Checklist

Migration is complete when:

- `/fpds-search` renders without errors
- Searching calls `/api/fpds` and returns results (or demo fallback)
- At least 5 representative filters from different sections change the outgoing query and affect results
- CSV export downloads a non-empty file matching displayed results
- Search history persists across reloads and can be re-run
- No runtime errors due to missing fields (defensive parsing remains)
- If details dialog exists: opens, shows full extracted fields, and exports JSON

---

## 7) Notes / Best Practices

- Avoid introducing open-proxy vulnerabilities if you accept arbitrary `url`.
- Prefer server-side proxy to stabilize CORS and network issues.
- Keep the migration minimal: preserve schema, mapping, and parsing logic.
