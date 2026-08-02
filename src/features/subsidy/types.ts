export interface SubsidySchemeConfig {
  schemeName: string;
  schemeShortName: string;
  description: string;
  applicablePropertyTypes: string[];
  lastVerified: string | null;
  officialInfoUrl: string;
  isConfigured: boolean;
  notes: string[];
  eligibilityChecklist: {
    number: string;
    title: string;
    description: string;
  }[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  sahajaSupportServices: string[];
}
