---
title: "Next.js Migration Prompt + Drop-In Module (Government Solicitation Search)"
description: "Copy/paste guide for migrating solicitation schemas + multi-platform search connectors into an existing Next.js website"
---

# Goal
Migrate the **government solicitation search** capabilities from this codebase into an **existing Next.js website**, including:

- A normalized **schema/types** for solicitations and search filters
- **Multi-platform search aggregation** (SAM.gov, DC Contracts, FPDS, and optional/mock connectors)
- **Server-side API routes** so API keys and secrets are not exposed to the browser
- A minimal **client hook** that calls the Next.js API route

This document is designed to be:

- **Copy/pasteable** into another repo
- A **single-source prompt/spec** you can hand to an LLM or a developer to implement the migration

# Source-of-truth mapping (from this repo)
These are the authoritative modules in the current project:

- **Core types**
  - `src/types/index.ts` (`Solicitation`, `SearchFilters`, `SearchResult`)
  - `src/types/platforms.ts` (`PlatformSolicitation`, `PlatformCredentials`, `PROCUREMENT_PLATFORMS`)
- **Aggregators**
  - `src/services/multiPlatformService.ts` (multi-platform aggregation into `PlatformSolicitation[]`)
  - `src/services/procurementService.ts` (SAM.gov + DC aggregation into `SearchResult`)
- **Platform connectors**
  - `src/services/samGovService.ts` (SAM.gov; supports fallback/mock)
  - `src/services/fpdsService.ts` (FPDS Atom feed parsing + transform)
  - In `multiPlatformService.ts`:
    - direct `axios` call for **DC Contracts**
    - `emmaService.ts`, `bonfireService.ts`, `bidNetService.ts`, `montgomeryCountyService.ts` (currently mock/session placeholders)

# Important architectural change for Next.js
In this repo, some services run in the browser and reference `process.env.REACT_APP_*` and/or `localStorage`.

In **Next.js**, you generally want:

- **API keys** on the server only
- **External API requests** from Next.js Route Handlers / API routes
- Client calls `fetch('/api/...')`

So the migration should:

- Move upstream API calls (SAM.gov, DC Contracts, FPDS) into **Next.js server routes**
- Keep only UI + client hooks/components in the browser

# Environment variables (map + rename)
The current repo uses CRA-style env vars:

- `REACT_APP_SAM_GOV_API_KEY`
- `REACT_APP_DC_CONTRACTS_API_KEY` (present but not required for the current DC endpoint)

## Next.js recommended env vars
In the target Next.js app, put these in `.env.local`:

```bash
SAM_GOV_API_KEY=your_sam_gov_key
DC_CONTRACTS_API_KEY=optional
```

Notes:

- Do **NOT** prefix with `NEXT_PUBLIC_` (that would expose values to the browser).

# Target Next.js file layout (App Router)
Copy/create these files in your Next.js project:

```text
src/
  lib/
    procurement/
      types.ts
      platforms.ts
      samGov.ts
      dcContracts.ts
      fpds.ts
      multiPlatform.ts
  app/
    api/
      solicitations/
        search/
          route.ts
  hooks/
    useSolicitationSearch.ts
  app/
    solicitations/
      page.tsx
```

If your project uses the **Pages Router**, see the "Pages Router alternative" section.

# Drop-in code (copy/paste)

## 1) `src/lib/procurement/types.ts`
Copy the normalized types (adapted from `src/types/index.ts`):

```ts
export interface Solicitation {
  id: string;
  title: string;
  description: string;
  agency: string;
  office: string;
  postedDate: string;
  responseDate: string;
  setAsideCode?: string;
  naicsCode: string;
  naicsDescription: string;
  classificationCode: string;
  active: boolean;
  award?: {
    date: string;
    amount: number;
    awardee: string;
  };
  pointOfContact?: {
    name: string;
    email: string;
    phone: string;
  };
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  source: 'sam.gov' | 'dc.gov' | 'emma' | 'bonfire' | 'bidnet' | 'montgomery' | 'fpds';
  url: string;
}

export interface SearchFilters {
  keyword?: string;
  agency?: string;
  office?: string;

  solNumber?: string;
  noticeId?: string;
  opportunityType?: string;

  naicsCode?: string;
  postedAfter?: string;
  postedBefore?: string;
  responseAfter?: string;
  responseBefore?: string;
  postedFrom?: string;
  postedTo?: string;

  active?: boolean;
  activeOnly?: boolean;

  setAside?: string;
  setAsideCode?: string;

  source?: 'sam.gov' | 'dc.gov' | 'both' | 'sam.gov/entity';

  page?: number;
  limit?: number;
}

export interface SearchResult {
  solicitations: Solicitation[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
```

## 2) `src/lib/procurement/platforms.ts`
Copy the multi-platform solicitation shape (adapted from `src/types/platforms.ts`):

```ts
import type { Solicitation } from './types';

export interface PlatformSolicitation extends Omit<Solicitation, 'classificationCode'> {
  platformId: string;
  platformName: string;
  submissionUrl: string;
  loginRequired: boolean;
  externalId: string;
  bidDeadline?: string;
  estimatedValue?: string;
  classificationCode?: string;
  contactInfo?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export type PlatformId =
  | 'sam-gov'
  | 'dc-contracts'
  | 'fpds'
  | 'emma'
  | 'ccsd-bonfire'
  | 'md-courts-bonfire'
  | 'bidnet-direct'
  | 'montgomery-county';
```

## 3) `src/lib/procurement/samGov.ts`
Server-side connector for SAM.gov (based on `multiPlatformService.ts` + `samGovService.ts`).

```ts
import axios from 'axios';
import type { SearchFilters } from './types';
import type { PlatformSolicitation } from './platforms';

const SAM_GOV_URL = 'https://api.sam.gov/opportunities/v2/search';

export async function searchSamGov(filters: SearchFilters): Promise<PlatformSolicitation[]> {
  const apiKey = process.env.SAM_GOV_API_KEY;
  if (!apiKey) return [];

  const params: any = {
    limit: 50,
  };

  if (filters.keyword) params.q = filters.keyword;
  if (filters.naicsCode) params.ncode = filters.naicsCode;
  if (filters.postedAfter) params.pdate = filters.postedAfter;
  if (filters.active !== undefined) params.active = filters.active ? 'true' : 'false';

  const response = await axios.get(SAM_GOV_URL, {
    params,
    headers: {
      'X-Api-Key': apiKey,
      'Content-Type': 'application/json',
    },
  });

  const data = response.data?.opportunitiesData || [];

  return data.map((item: any) => ({
    id: item.noticeId || Math.random().toString(36),
    title: item.title || 'No Title',
    description: item.description || item.synopsis || '',
    agency: item.fullParentPathName || 'Unknown Agency',
    office: item.subTier || 'Unknown Office',
    postedDate: item.postedDate || new Date().toISOString(),
    responseDate: item.responseDate || '',
    naicsCode: item.naicsCode || '',
    naicsDescription: item.naicsDescription || '',
    active: item.active !== false,
    source: 'sam.gov' as const,
    url: `https://sam.gov/opp/${item.noticeId}/view`,

    platformId: 'sam-gov',
    platformName: 'SAM.gov',
    submissionUrl: `https://sam.gov/opp/${item.noticeId}/view`,
    loginRequired: true,
    externalId: item.noticeId,
    bidDeadline: item.responseDate,
    estimatedValue: item.awardAmount || '',
    contactInfo: item.pointOfContact?.[0]
      ? {
          name: item.pointOfContact[0].fullName || '',
          email: item.pointOfContact[0].email || '',
          phone: item.pointOfContact[0].phone || '',
        }
      : undefined,
  }));
}
```

## 4) `src/lib/procurement/dcContracts.ts`
Server-side connector for DC Contracts (based on `multiPlatformService.ts`).

```ts
import axios from 'axios';
import type { SearchFilters } from './types';
import type { PlatformSolicitation } from './platforms';

const DC_URL = 'https://contracts.ocp.dc.gov/api/solicitations';

export async function searchDcContracts(filters: SearchFilters): Promise<PlatformSolicitation[]> {
  const params: any = { limit: 50 };

  if (filters.keyword) params.search = filters.keyword;
  if (filters.agency) params.agency = filters.agency;
  if (filters.postedAfter) params.posted_after = filters.postedAfter;
  if (filters.active !== undefined) params.status = filters.active ? 'open' : 'closed';

  const response = await axios.get(DC_URL, {
    params,
    headers: { 'Content-Type': 'application/json' },
  });

  const results = response.data?.results || [];

  return results.map((item: any) => ({
    id: item.id || Math.random().toString(36),
    title: item.title || 'No Title',
    description: item.description || '',
    agency: 'DC Government',
    office: item.office || 'Unknown Office',
    postedDate: item.posted_date || new Date().toISOString(),
    responseDate: item.response_date || '',
    naicsCode: item.naics_code || '',
    naicsDescription: item.naics_description || '',
    active: item.status === 'open',
    source: 'dc.gov' as const,
    url: `https://contracts.ocp.dc.gov/solicitations/${item.id}`,

    platformId: 'dc-contracts',
    platformName: 'DC Contracts',
    submissionUrl: `https://contracts.ocp.dc.gov/solicitations/${item.id}`,
    loginRequired: false,
    externalId: item.id,
    bidDeadline: item.response_date,
    estimatedValue: item.estimated_value || '',
    contactInfo: item.contact
      ? {
          name: item.contact.name || '',
          email: item.contact.email || '',
          phone: item.contact.phone || '',
        }
      : undefined,
  }));
}
```

## 5) `src/lib/procurement/fpds.ts`
FPDS Atom feed connector.

Important: your current `FpdsService` uses `DOMParser`, which is a **browser API**. In Next.js server routes, use an XML parser library.

Recommended: `fast-xml-parser`.

Install:

```bash
npm i fast-xml-parser
```

Implementation (minimal transformation; you can expand later):

```ts
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import type { SearchFilters } from './types';
import type { PlatformSolicitation } from './platforms';

const FPDS_URL = 'https://www.fpds.gov/ezsearch/FEEDS/ATOM';

function buildFpdsUrl(filters: SearchFilters): string {
  const queryParts: string[] = [];

  if (filters.keyword) queryParts.push(`KEYWORD:"${filters.keyword}"`);
  if (filters.agency) queryParts.push(`CONTRACTING_AGENCY_NAME:"${filters.agency}"`);
  if (filters.naicsCode) queryParts.push(`PRINCIPAL_NAICS_CODE:"${filters.naicsCode}"`);

  if (filters.postedAfter) queryParts.push(`SIGNED_DATE:[${filters.postedAfter},]`);
  if (filters.postedBefore) queryParts.push(`SIGNED_DATE:[,${filters.postedBefore}]`);

  const query = encodeURIComponent(queryParts.join(' '));
  return `${FPDS_URL}?FEEDNAME=PUBLIC&q=${query}`;
}

export async function searchFpds(filters: SearchFilters): Promise<PlatformSolicitation[]> {
  const url = buildFpdsUrl(filters);

  const response = await axios.get(url, {
    headers: { Accept: 'application/atom+xml, application/xml, text/xml' },
    timeout: 30000,
  });

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });

  const parsed = parser.parse(response.data);
  const entries = parsed?.feed?.entry ? (Array.isArray(parsed.feed.entry) ? parsed.feed.entry : [parsed.feed.entry]) : [];

  // Minimal mapping (FPDS data shape is complex; this just makes it usable quickly)
  return entries.map((entry: any) => {
    const alternate = Array.isArray(entry.link) ? entry.link.find((l: any) => l['@_rel'] === 'alternate') : undefined;
    const href = alternate?.['@_href'] || '';

    const title = typeof entry.title === 'string' ? entry.title : 'FPDS Contract';
    const summary = typeof entry.summary === 'string' ? entry.summary : '';

    const id = typeof entry.id === 'string' ? entry.id : `fpds_${Math.random().toString(36)}`;

    return {
      id,
      title,
      description: summary || title,
      agency: 'FPDS.gov',
      office: 'FPDS',
      postedDate: entry.updated || new Date().toISOString(),
      responseDate: '',
      naicsCode: filters.naicsCode || '',
      naicsDescription: '',
      active: true,
      source: 'fpds' as const,
      url: href || 'https://www.fpds.gov',

      platformId: 'fpds',
      platformName: 'FPDS.gov',
      submissionUrl: href || 'https://www.fpds.gov',
      loginRequired: false,
      externalId: id,
    };
  });
}
```

## 6) `src/lib/procurement/multiPlatform.ts`
Aggregation + de-dupe logic based on `src/services/multiPlatformService.ts`.

```ts
import type { SearchFilters } from './types';
import type { PlatformId, PlatformSolicitation } from './platforms';
import { searchSamGov } from './samGov';
import { searchDcContracts } from './dcContracts';
import { searchFpds } from './fpds';

function removeDuplicates(solicitations: PlatformSolicitation[]): PlatformSolicitation[] {
  const seen = new Set<string>();
  return solicitations.filter((s) => {
    const key = `${s.title.toLowerCase()}-${s.agency.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function searchPlatforms(filters: SearchFilters, platforms: PlatformId[]): Promise<PlatformSolicitation[]> {
  const tasks = platforms.map(async (platformId) => {
    switch (platformId) {
      case 'sam-gov':
        return searchSamGov(filters);
      case 'dc-contracts':
        return searchDcContracts(filters);
      case 'fpds':
        return searchFpds(filters);
      // The remaining platforms in this repo are mock/session placeholders.
      // Migrate them later when you implement real auth + scraping/API integration.
      default:
        return [];
    }
  });

  const settled = await Promise.allSettled(tasks);
  const merged: PlatformSolicitation[] = [];

  settled.forEach((r) => {
    if (r.status === 'fulfilled') merged.push(...r.value);
  });

  return removeDuplicates(merged);
}
```

## 7) Next.js API route: `src/app/api/solicitations/search/route.ts`
This is the server endpoint your UI will call.

```ts
import { NextResponse } from 'next/server';
import type { SearchFilters } from '@/lib/procurement/types';
import { searchPlatforms } from '@/lib/procurement/multiPlatform';
import type { PlatformId } from '@/lib/procurement/platforms';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      filters?: SearchFilters;
      platforms?: PlatformId[];
    };

    const filters = body.filters || {};
    const platforms = body.platforms && body.platforms.length
      ? body.platforms
      : (['sam-gov', 'dc-contracts', 'fpds'] as PlatformId[]);

    const results = await searchPlatforms(filters, platforms);

    return NextResponse.json({ results });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to search solicitations' },
      { status: 500 }
    );
  }
}
```

## 8) Client hook: `src/hooks/useSolicitationSearch.ts`

```ts
'use client';

import { useCallback, useState } from 'react';
import type { SearchFilters } from '@/lib/procurement/types';
import type { PlatformId, PlatformSolicitation } from '@/lib/procurement/platforms';

export function useSolicitationSearch() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PlatformSolicitation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (filters: SearchFilters, platforms: PlatformId[]) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/solicitations/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filters, platforms }),
      });

      if (!res.ok) {
        setError('Search failed');
        setResults([]);
        return;
      }

      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setError('Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, results, error, search };
}
```

## 9) Minimal page: `src/app/solicitations/page.tsx`
This is intentionally minimal so you can wire it into your existing UI system.

```tsx
'use client';

import { useState } from 'react';
import { useSolicitationSearch } from '@/hooks/useSolicitationSearch';
import type { PlatformId } from '@/lib/procurement/platforms';

export default function SolicitationsPage() {
  const { loading, results, error, search } = useSolicitationSearch();
  const [keyword, setKeyword] = useState('information technology');
  const [platforms, setPlatforms] = useState<PlatformId[]>(['sam-gov', 'dc-contracts', 'fpds']);

  return (
    <main style={{ padding: 24 }}>
      <h1>Solicitation Search</h1>

      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="keyword"
          style={{ width: 360 }}
        />
        <button onClick={() => search({ keyword }, platforms)} disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}

      <ul style={{ marginTop: 16 }}>
        {results.map((r) => (
          <li key={r.id} style={{ marginBottom: 10 }}>
            <a href={r.url} target="_blank" rel="noreferrer">
              {r.title}
            </a>
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              {r.platformName} · {r.agency}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

# Pages Router alternative
If your Next.js project uses `pages/` instead of the App Router:

- Create `pages/api/solicitations/search.ts` exporting a default handler
- Keep the same server-side logic (call `searchPlatforms`)

# Notes on auth-required platforms (Emma / Bonfire / Montgomery / BidNet)
In this repo, these connectors are currently:

- Using **mock data**
- Using **placeholder session auth** (not real login flows)
- Storing credentials in `localStorage` in demo mode (`PlatformAuthService`)

For a production Next.js deployment, you should:

- Store credentials **server-side** (DB + encryption, or a secret manager)
- Implement a real integration strategy (official APIs where available, otherwise scraping with legal review)

This migration package intentionally focuses on:

- **SAM.gov** (API key)
- **DC Contracts** (public)
- **FPDS** (public Atom feed)

# LLM migration prompt (copy/paste)
Use this prompt with your preferred coding LLM to migrate into an existing Next.js site.

```text
You are migrating a government solicitation search module into an existing Next.js (TypeScript) website.

Requirements:
1) Create a server-side API endpoint that accepts POST { filters, platforms } and returns normalized solicitation results.
2) Implement connectors for:
   - SAM.gov opportunities search (requires env var SAM_GOV_API_KEY; must remain server-side)
   - DC Contracts search (public endpoint)
   - FPDS Atom feed search (public endpoint; parse XML server-side)
3) Use the following normalized types: Solicitation, SearchFilters, PlatformSolicitation.
4) Implement multi-platform aggregation with de-duplication by (title + agency).
5) Provide a client hook `useSolicitationSearch()` calling the API route.
6) Provide a minimal page `/solicitations` demonstrating the search.
7) Do not expose secrets to the browser. No NEXT_PUBLIC_ for API keys.
8) Keep code modular under `src/lib/procurement/*`.

Return: a list of files with full contents.

Reference: The original codebase used axios services and a MultiPlatformService; adapt those patterns but ensure all external calls are server-side.
```

# Completion checklist
- [ ] `.env.local` has `SAM_GOV_API_KEY=...`
- [ ] `npm i axios fast-xml-parser`
- [ ] `POST /api/solicitations/search` works locally
- [ ] `/solicitations` page renders results

