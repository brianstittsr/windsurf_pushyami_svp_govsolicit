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
  source: "sam.gov" | "dc.gov" | "emma" | "bonfire" | "bidnet" | "montgomery" | "fpds";
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

  source?: "sam.gov" | "dc.gov" | "both" | "sam.gov/entity";

  page?: number;
  limit?: number;
}

export interface SearchResult {
  solicitations: Solicitation[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
