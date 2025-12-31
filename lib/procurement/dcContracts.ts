import type { SearchFilters } from "./types";
import type { PlatformSolicitation } from "./platforms";

const DC_URL = "https://contracts.ocp.dc.gov/api/solicitations";

export async function searchDcContracts(filters: SearchFilters): Promise<PlatformSolicitation[]> {
  const url = new URL(DC_URL);
  url.searchParams.set("limit", "50");

  if (filters.keyword) url.searchParams.set("search", filters.keyword);
  if (filters.agency) url.searchParams.set("agency", filters.agency);
  if (filters.postedAfter) url.searchParams.set("posted_after", filters.postedAfter);
  if (filters.active !== undefined) url.searchParams.set("status", filters.active ? "open" : "closed");

  const resp = await fetch(url.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error("DC contracts error", resp.status, text);
    return [];
  }

  const data = await resp.json();
  const results = data?.results || [];

  return results.map((item: any) => ({
    id: item.id || Math.random().toString(36),
    title: item.title || "No Title",
    description: item.description || "",
    agency: "DC Government",
    office: item.office || "Unknown Office",
    postedDate: item.posted_date || new Date().toISOString(),
    responseDate: item.response_date || "",
    naicsCode: item.naics_code || "",
    naicsDescription: item.naics_description || "",
    active: item.status === "open",
    source: "dc.gov" as const,
    url: item.id ? `https://contracts.ocp.dc.gov/solicitations/${item.id}` : "https://contracts.ocp.dc.gov",

    platformId: "dc-contracts",
    platformName: "DC Contracts",
    submissionUrl: item.id ? `https://contracts.ocp.dc.gov/solicitations/${item.id}` : "https://contracts.ocp.dc.gov",
    loginRequired: false,
    externalId: item.id || "",
    bidDeadline: item.response_date,
    estimatedValue: item.estimated_value || "",
    contactInfo: item.contact
      ? {
          name: item.contact.name || "",
          email: item.contact.email || "",
          phone: item.contact.phone || "",
        }
      : undefined,
  }));
}
