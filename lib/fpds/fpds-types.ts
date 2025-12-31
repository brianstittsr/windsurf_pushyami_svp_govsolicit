export type FpdsSortField = "SIGNED_DATE" | "LAST_MOD_DATE" | "OBLIGATED_AMOUNT";
export type FpdsSortDirection = "asc" | "desc";

export interface FpdsSearchParams {
  vendorName?: string;
  piid?: string;
  agencyName?: string;
  agencyId?: string;
  naics?: string;
  psc?: string;
  descriptionKeywords?: string;

  signedDateStart?: string; // YYYY-MM-DD
  signedDateEnd?: string; // YYYY-MM-DD
  lastModifiedStart?: string; // YYYY-MM-DD
  lastModifiedEnd?: string; // YYYY-MM-DD

  minObligated?: number;
  maxObligated?: number;

  placeOfPerformanceState?: string;

  maxRecords?: number;
  sortField?: FpdsSortField;
  sortDirection?: FpdsSortDirection;
}

export interface FpdsContractRecord {
  id: string;
  title?: string;
  link?: string;
  modified?: string;

  agencyName?: string;
  agencyId?: string;
  piid?: string;
  modNumber?: string;
  transactionNumber?: string;

  vendorName?: string;

  signedDate?: string;

  obligatedAmount?: number;
  baseAndExercisedOptionsValue?: number;
  baseAndAllOptionsValue?: number;
}

export interface FpdsSearchResult {
  success: boolean;
  isDemo?: boolean;
  message?: string;
  query: {
    q: string;
    start: number;
  };
  records: FpdsContractRecord[];
  rawXml?: string;
}
