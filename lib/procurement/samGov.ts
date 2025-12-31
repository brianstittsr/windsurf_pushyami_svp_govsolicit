import type { SearchFilters } from "./types";
import type { PlatformSolicitation } from "./platforms";

const SAM_GOV_URL = "https://api.sam.gov/opportunities/v2/search";

export async function searchSamGov(filters: SearchFilters): Promise<PlatformSolicitation[]> {
  const apiKey = process.env.SAM_GOV_API_KEY;
  if (!apiKey) return [];

  const params: Record<string, string> = {
    limit: "50",
  };

  if (filters.keyword) params.q = filters.keyword;
  if (filters.naicsCode) params.ncode = filters.naicsCode;
  if (filters.postedAfter) params.pdate = filters.postedAfter;
  if (filters.active !== undefined) params.active = filters.active ? "true" : "false";

  const url = new URL(SAM_GOV_URL);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const resp = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error("SAM.gov error", resp.status, text);
    return [];
  }

  const data = await resp.json();
  const items = data?.opportunitiesData || [];

  return items.map((item: any) => ({
    id: item.noticeId || Math.random().toString(36),
    title: item.title || "No Title",
    description: item.description || item.synopsis || "",
    agency: item.fullParentPathName || "Unknown Agency",
    office: item.subTier || "Unknown Office",
    postedDate: item.postedDate || new Date().toISOString(),
    responseDate: item.responseDate || "",
    naicsCode: item.naicsCode || "",
    naicsDescription: item.naicsDescription || "",
    active: item.active !== false,
    source: "sam.gov" as const,
    url: item.noticeId ? `https://sam.gov/opp/${item.noticeId}/view` : "https://sam.gov",

    platformId: "sam-gov",
    platformName: "SAM.gov",
    submissionUrl: item.noticeId ? `https://sam.gov/opp/${item.noticeId}/view` : "https://sam.gov",
    loginRequired: true,
    externalId: item.noticeId || "",
    bidDeadline: item.responseDate,
    estimatedValue: item.awardAmount || "",
    contactInfo: item.pointOfContact?.[0]
      ? {
          name: item.pointOfContact[0].fullName || "",
          email: item.pointOfContact[0].email || "",
          phone: item.pointOfContact[0].phone || "",
        }
      : undefined,
  }));
}
