export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ContactPerson {
  name: string;
  phone: string;
  rawPhone: string;
  role?: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  primaryMarket: string;
  phone: string;
  email: string;
  contacts: ContactPerson[];
  address: {
    city: string;
    state: string;
    country: string;
    fullAddress: string;
  };
  social: {
    whatsapp: string;
    linkedin: string;
    instagram: string;
    facebook: string;
  };
}

export const SITE_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Why Solar', href: '#why-solar' },
  { label: 'Subsidy', href: '#subsidy' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const NAV_CTA: NavItem = {
  label: 'Get Free Quote',
  href: '#quote',
};

export const SAHAJA_COMPANY_INFO: CompanyInfo = {
  name: 'Sahaja Solar',
  legalName: 'Sahaja Solar Energy Solutions Pvt. Ltd.',
  tagline: 'Powering India with Clean, Sustainable & High-Efficiency Solar Energy',
  primaryMarket: 'Andhra Pradesh & Pan-India Residential, Commercial, and Industrial Solar',
  phone: '+91 8019604025',
  email: 'sahajasolar@gmail.com',
  contacts: [
    {
      name: 'M. Sivaraj',
      phone: '+91 80196 04025',
      rawPhone: '8019604025',
      role: 'Solar Solutions Advisor',
    },
    {
      name: 'Kodali Venkateswararao',
      phone: '+91 74162 02494',
      rawPhone: '7416202494',
      role: 'Engineering & Project Lead',
    },
  ],
  address: {
    city: 'Andhra Pradesh',
    state: 'Andhra Pradesh',
    country: 'India',
    fullAddress: 'Sahaja Solar Energy Solutions, Andhra Pradesh, India',
  },
  social: {
    whatsapp: 'https://wa.me/918019604025',
    linkedin: 'https://linkedin.com/company/sahaja-solar',
    instagram: 'https://instagram.com/sahajasolar',
    facebook: 'https://facebook.com/sahajasolar',
  },
};

export const SERVICES_CONFIG = [
  {
    id: 'residential',
    title: 'Residential Solar Systems',
    description: 'Rooftop solar solutions designed to maximize household energy independence and lower power bills.',
    iconName: 'Home',
  },
  {
    id: 'commercial',
    title: 'Commercial & Industrial Solar',
    description: 'Scalable MW & KW solar infrastructure reducing operational expenditures for enterprises.',
    iconName: 'Building2',
  },
  {
    id: 'epc',
    title: 'Solar EPC Solutions',
    description: 'Turnkey Engineering, Procurement, and Construction with end-to-end project management.',
    iconName: 'Wrench',
  },
  {
    id: 'modules',
    title: 'Tier-1 Solar Modules',
    description: 'High-efficiency Mono PERC & TOPCon solar PV modules optimized for Indian climate conditions.',
    iconName: 'SunMedium',
  },
  {
    id: 'inverters',
    title: 'Advanced Solar Inverters',
    description: 'Smart string and central inverters with real-time IoT grid monitoring and safety controls.',
    iconName: 'Zap',
  },
  {
    id: 'amc',
    title: 'AMC & Maintenance',
    description: 'Proactive panel cleaning, thermal inspection, and preventive plant maintenance contracts.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'bos',
    title: 'BOS Materials',
    description: 'Certified Balance of System components, mounting structures, ACDB/DCDB boxes & solar cables.',
    iconName: 'Cpu',
  },
  {
    id: 'consultation',
    title: 'Solar Consultation',
    description: 'Detailed shadow analysis, yield calculation, and structural feasibility assessments.',
    iconName: 'Compass',
  },
  {
    id: 'subsidy',
    title: 'Government Subsidy Assistance',
    description: 'Hassle-free PM Surya Ghar & DISCOM approval guidance for maximum subsidy claims.',
    iconName: 'FileCheck',
  },
];
