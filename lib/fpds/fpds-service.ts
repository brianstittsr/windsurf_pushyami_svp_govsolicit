import type { FpdsContractRecord, FpdsSearchParams, FpdsSearchResult, FpdsSortDirection, FpdsSortField } from "./fpds-types";

function quoteValue(value: string) {
  const v = value.trim();
  if (!v) return "";
  // FPDS examples use quoted terms for fielded search
  return `\"${v.replace(/\"/g, "")}\"`;
}

function dateToFpds(date: string) {
  // FPDS UI uses mm/dd/yyyy, but atom content shows yyyy-mm-dd.
  // Query syntax supports YYYY/MM/DD in many Solr-based systems, but docs are sparse.
  // We will send YYYY-MM-DD and rely on FPDS normalization.
  return date;
}

function buildRange(field: string, start?: string, end?: string) {
  if (!start && !end) return "";
  const s = start ? dateToFpds(start) : "*";
  const e = end ? dateToFpds(end) : "*";
  return `${field}:[${s} TO ${e}]`;
}

function buildNumberRange(field: string, min?: number, max?: number) {
  if (min == null && max == null) return "";
  const s = min != null ? String(min) : "*";
  const e = max != null ? String(max) : "*";
  return `${field}:[${s} TO ${e}]`;
}

function mapSort(field?: FpdsSortField, dir?: FpdsSortDirection) {
  // FPDS atom supports sort via query sometimes, but not well documented.
  // We'll append as part of q for future compatibility; harmless if ignored.
  if (!field) return "";
  const d = dir === "asc" ? "asc" : "desc";
  switch (field) {
    case "SIGNED_DATE":
      return `SORT_BY_DATE_SIGNED:${d}`;
    case "LAST_MOD_DATE":
      return `SORT_BY_LAST_MOD_DATE:${d}`;
    case "OBLIGATED_AMOUNT":
      return `SORT_BY_ACTION_OBLIGATION:${d}`;
    default:
      return "";
  }
}

export function buildFpdsQuery(params: FpdsSearchParams) {
  const parts: string[] = [];

  if (params.vendorName) parts.push(`VENDOR_FULL_NAME:${quoteValue(params.vendorName)}`);
  if (params.piid) parts.push(`PIID:${quoteValue(params.piid)}`);
  if (params.agencyName) parts.push(`CONTRACTING_AGENCY_NAME:${quoteValue(params.agencyName)}`);
  if (params.agencyId) parts.push(`AGENCY_CODE:${quoteValue(params.agencyId)}`);
  if (params.naics) parts.push(`PRINCIPAL_NAICS_CODE:${quoteValue(params.naics)}`);
  if (params.psc) parts.push(`PRODUCT_OR_SERVICE_CODE:${quoteValue(params.psc)}`);
  if (params.descriptionKeywords) parts.push(params.descriptionKeywords.trim());

  const signed = buildRange("DATE_SIGNED", params.signedDateStart, params.signedDateEnd);
  if (signed) parts.push(signed);

  const lastMod = buildRange("LAST_MOD_DATE", params.lastModifiedStart, params.lastModifiedEnd);
  if (lastMod) parts.push(lastMod);

  const obligation = buildNumberRange("ACTION_OBLIGATION", params.minObligated, params.maxObligated);
  if (obligation) parts.push(obligation);

  if (params.placeOfPerformanceState) {
    parts.push(`PLACE_OF_PERFORMANCE_STATE_CODE:${quoteValue(params.placeOfPerformanceState)}`);
  }

  const sort = mapSort(params.sortField, params.sortDirection);
  if (sort) parts.push(sort);

  return parts.filter(Boolean).join(" ").trim();
}

function textFrom(el: Element | null | undefined) {
  if (!el) return undefined;
  const t = el.textContent?.trim();
  return t || undefined;
}

function numberFrom(text?: string) {
  if (!text) return undefined;
  const n = Number(String(text).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

function getFirstNS(parent: Element, ns: string, tag: string) {
  return parent.getElementsByTagNameNS(ns, tag)?.[0] ?? null;
}

function parseFpdsAtom(xml: string, maxRecords?: number): FpdsContractRecord[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");

  const feed = doc.getElementsByTagName("feed")[0];
  if (!feed) return [];

  const entries = Array.from(feed.getElementsByTagName("entry"));
  const nsFpds = "https://www.fpds.gov/FPDS";

  const records: FpdsContractRecord[] = [];

  for (const entry of entries) {
    if (maxRecords && records.length >= maxRecords) break;

    const title = textFrom(entry.getElementsByTagName("title")[0]);
    const modified = textFrom(entry.getElementsByTagName("modified")[0]);
    const linkEl = Array.from(entry.getElementsByTagName("link")).find((l) => l.getAttribute("rel") === "alternate");
    const link = linkEl?.getAttribute("href") || undefined;

    const award = entry.getElementsByTagNameNS(nsFpds, "award")?.[0];

    let agencyId: string | undefined;
    let agencyName: string | undefined;
    let piid: string | undefined;
    let modNumber: string | undefined;
    let transactionNumber: string | undefined;
    let signedDate: string | undefined;
    let obligatedAmount: number | undefined;
    let baseAndExercisedOptionsValue: number | undefined;
    let baseAndAllOptionsValue: number | undefined;

    if (award) {
      const awardId = getFirstNS(award, nsFpds, "awardID");
      const awardContractId = awardId ? getFirstNS(awardId, nsFpds, "awardContractID") : null;

      const agency = awardContractId ? getFirstNS(awardContractId, nsFpds, "agencyID") : null;
      agencyId = textFrom(agency);
      agencyName = agency?.getAttribute("name") || undefined;

      piid = awardContractId ? textFrom(getFirstNS(awardContractId, nsFpds, "PIID")) : undefined;
      modNumber = awardContractId ? textFrom(getFirstNS(awardContractId, nsFpds, "modNumber")) : undefined;
      transactionNumber = awardContractId ? textFrom(getFirstNS(awardContractId, nsFpds, "transactionNumber")) : undefined;

      const dates = getFirstNS(award, nsFpds, "relevantContractDates");
      signedDate = dates ? textFrom(getFirstNS(dates, nsFpds, "signedDate")) : undefined;

      const dollar = getFirstNS(award, nsFpds, "dollarValues");
      obligatedAmount = dollar ? numberFrom(textFrom(getFirstNS(dollar, nsFpds, "obligatedAmount"))) : undefined;
      baseAndExercisedOptionsValue = dollar ? numberFrom(textFrom(getFirstNS(dollar, nsFpds, "baseAndExercisedOptionsValue"))) : undefined;
      baseAndAllOptionsValue = dollar ? numberFrom(textFrom(getFirstNS(dollar, nsFpds, "baseAndAllOptionsValue"))) : undefined;
    }

    records.push({
      id: `${piid || "unknown"}-${modNumber || "0"}-${transactionNumber || "0"}-${modified || ""}`,
      title,
      link,
      modified,
      agencyId,
      agencyName,
      piid,
      modNumber,
      transactionNumber,
      signedDate,
      obligatedAmount,
      baseAndExercisedOptionsValue,
      baseAndAllOptionsValue,
    });
  }

  return records;
}

function demoResults(q: string): FpdsContractRecord[] {
  return [
    {
      id: "demo-1",
      title: `Demo result for: ${q}`,
      link: "https://www.fpds.gov",
      modified: new Date().toISOString(),
      agencyName: "DEMO AGENCY",
      agencyId: "0000",
      piid: "DEMO-PIID-0001",
      modNumber: "0",
      transactionNumber: "0",
      signedDate: new Date().toISOString(),
      obligatedAmount: 100000,
    },
  ];
}

export async function searchFpds(params: FpdsSearchParams): Promise<FpdsSearchResult> {
  const q = buildFpdsQuery(params);
  const start = 0;

  if (!q) {
    return {
      success: false,
      message: "Enter at least one search filter.",
      query: { q, start },
      records: [],
    };
  }

  try {
    const url = new URL("/api/fpds", window.location.origin);
    url.searchParams.set("q", q);
    url.searchParams.set("feed", "PUBLIC");
    url.searchParams.set("start", String(start));

    const resp = await fetch(url.toString(), { method: "GET" });
    if (!resp.ok) {
      const text = await resp.text();
      console.error("FPDS proxy non-200:", resp.status, text);
      return {
        success: true,
        isDemo: true,
        message: "FPDS unavailable; showing demo results.",
        query: { q, start },
        records: demoResults(q),
      };
    }

    const xml = await resp.text();
    const records = parseFpdsAtom(xml, params.maxRecords);

    if (!records.length) {
      return {
        success: true,
        message: "No results found.",
        query: { q, start },
        records: [],
        rawXml: xml,
      };
    }

    return {
      success: true,
      query: { q, start },
      records,
      rawXml: xml,
    };
  } catch (e) {
    console.error(e);
    return {
      success: true,
      isDemo: true,
      message: "FPDS unavailable; showing demo results.",
      query: { q, start },
      records: demoResults(q),
    };
  }
}
