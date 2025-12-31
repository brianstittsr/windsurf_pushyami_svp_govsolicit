import { XMLParser } from "fast-xml-parser";
import type { SearchFilters } from "./types";
import type { PlatformSolicitation } from "./platforms";

const FPDS_URL = "https://www.fpds.gov/ezsearch/FEEDS/ATOM";

function buildFpdsUrl(filters: SearchFilters): string {
  const queryParts: string[] = [];

  if (filters.keyword) queryParts.push(`KEYWORD:\"${filters.keyword}\"`);
  if (filters.agency) queryParts.push(`CONTRACTING_AGENCY_NAME:\"${filters.agency}\"`);
  if (filters.naicsCode) queryParts.push(`PRINCIPAL_NAICS_CODE:\"${filters.naicsCode}\"`);

  if (filters.postedAfter) queryParts.push(`SIGNED_DATE:[${filters.postedAfter} TO *]`);
  if (filters.postedBefore) queryParts.push(`SIGNED_DATE:[* TO ${filters.postedBefore}]`);

  const q = encodeURIComponent(queryParts.join(" "));
  return `${FPDS_URL}?s=FPDS&FEEDNAME=PUBLIC&q=${q}`;
}

export async function searchFpds(filters: SearchFilters): Promise<PlatformSolicitation[]> {
  const url = buildFpdsUrl(filters);

  const resp = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/atom+xml, application/xml, text/xml" },
    cache: "no-store",
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error("FPDS error", resp.status, text);
    return [];
  }

  const xml = await resp.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });

  const parsed = parser.parse(xml);
  const entriesRaw = parsed?.feed?.entry;
  const entries = entriesRaw ? (Array.isArray(entriesRaw) ? entriesRaw : [entriesRaw]) : [];

  return entries.map((entry: any) => {
    const links = Array.isArray(entry.link) ? entry.link : entry.link ? [entry.link] : [];
    const alternate = links.find((l: any) => l["@_rel"] === "alternate");
    const href = alternate?.["@_href"] || "";

    const title = typeof entry.title === "string" ? entry.title : "FPDS Contract";
    const summary = typeof entry.summary === "string" ? entry.summary : "";
    const id = typeof entry.id === "string" ? entry.id : `fpds_${Math.random().toString(36)}`;

    return {
      id,
      title,
      description: summary || title,
      agency: "FPDS.gov",
      office: "FPDS",
      postedDate: entry.updated || new Date().toISOString(),
      responseDate: "",
      naicsCode: filters.naicsCode || "",
      naicsDescription: "",
      active: true,
      source: "fpds" as const,
      url: href || "https://www.fpds.gov",

      platformId: "fpds",
      platformName: "FPDS.gov",
      submissionUrl: href || "https://www.fpds.gov",
      loginRequired: false,
      externalId: id,
    };
  });
}
