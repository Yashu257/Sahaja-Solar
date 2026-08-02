import { SubsidySchemeConfig } from './types';

export const SUBSIDY_CONFIG: SubsidySchemeConfig = {
  schemeName: 'PM Surya Ghar: Muft Bijli Yojana & State DISCOM Schemes',
  schemeShortName: 'PM Surya Ghar',
  description:
    'Eligible residential rooftop solar installations in India and Andhra Pradesh may qualify for financial assistance under central and state government rooftop solar initiatives.',
  applicablePropertyTypes: ['residential'],
  lastVerified: 'July 2026',
  officialInfoUrl: 'https://pmsuryaghar.gov.in',
  isConfigured: false, // Default unconfigured state until client verifies exact DISCOM rates
  notes: [
    'Subsidy eligibility and financial assistance amounts depend on government policies, DISCOM approvals, and system specifications.',
    'Commercial properties are subject to separate tax benefits (e.g. accelerated depreciation) rather than residential rooftop subsidies.',
  ],
  eligibilityChecklist: [
    {
      number: '01',
      title: 'RESIDENTIAL PROPERTY',
      description:
        'Government rooftop solar support is generally intended for eligible residential electricity consumers with valid roof rights under applicable schemes.',
    },
    {
      number: '02',
      title: 'GRID-CONNECTED SYSTEM',
      description:
        'Eligibility depends on installing approved solar modules and grid-tied string inverters through an authorized EPC partner with DISCOM net-metering.',
    },
    {
      number: '03',
      title: 'DOCUMENTATION',
      description:
        'Applicants require valid electricity bill details, ID proof, address verification, and active bank account details for direct benefit transfer.',
    },
  ],
  processSteps: [
    {
      step: '01',
      title: 'CHECK ELIGIBILITY',
      description: 'Evaluate electricity bill, roof feasibility, and current DISCOM scheme criteria.',
    },
    {
      step: '02',
      title: 'DOCUMENTATION PREPARATION',
      description: 'Prepare electricity connection details, identity verification, and DISCOM portal filings.',
    },
    {
      step: '03',
      title: 'SYSTEM INSTALLATION',
      description: 'Sahaja Solar installs certified Tier-1 equipment following grid safety standards.',
    },
    {
      step: '04',
      title: 'DISCOM VERIFICATION',
      description: 'Net-metering inspection, testing, and commissioning by local electricity authorities.',
    },
    {
      step: '05',
      title: 'SUBSIDY DISBURSEMENT',
      description: 'Direct credit to the applicant bank account by government portal upon approval.',
    },
  ],
  sahajaSupportServices: [
    'Eligibility & Policy Guidance',
    'DISCOM Portal Application Assistance',
    'Net-Metering Inspection Coordination',
    'Certified Equipment Documentation',
    'Post-Commissioning Follow-through',
  ],
};
