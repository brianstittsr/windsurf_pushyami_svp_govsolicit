import type { Solicitation } from "./types";

export interface PlatformSolicitation extends Omit<Solicitation, "classificationCode"> {
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
  | "sam-gov"
  | "dc-contracts"
  | "fpds"
  | "emma"
  | "ccsd-bonfire"
  | "md-courts-bonfire"
  | "bidnet-direct"
  | "montgomery-county";
