export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  label: string;
  description: string;
  image?: string;
  variant: 'primary' | 'secondary' | 'wide';
  featureDetail?: string;
  tags?: string[];
}

export const SAHAJA_SERVICES: ServiceItem[] = [
  {
    id: 'residential-solar',
    index: '01',
    title: 'RESIDENTIAL SOLAR',
    label: 'Homes • Rooftops',
    description:
      'Smart rooftop solar solutions designed for homes, helping households generate clean electricity and reduce dependence on grid power.',
    image: '/assets/images/services/residential-solar.jpg',
    variant: 'primary',
    tags: ['Custom Rooftop Design', 'PM Surya Ghar Ready', 'DISCOM Approval'],
  },
  {
    id: 'commercial-solar',
    index: '02',
    title: 'COMMERCIAL SOLAR',
    label: 'Businesses • Commercial Buildings',
    description:
      'Scalable solar systems for businesses and commercial properties, designed to support long-term energy efficiency and operating-cost reduction.',
    image: '/assets/images/services/commercial-solar.jpg',
    variant: 'primary',
    tags: ['Industrial Plants', 'MW & KW Scale', 'OpEx Optimization'],
  },
  {
    id: 'solar-epc',
    index: '03',
    title: 'SOLAR EPC',
    label: 'Engineering • Procurement • Construction',
    description:
      'End-to-end engineering, procurement and construction support — from system planning and equipment selection to installation and commissioning.',
    variant: 'secondary',
    featureDetail: 'ENGINEERING → PROCUREMENT → CONSTRUCTION',
  },
  {
    id: 'modules-inverters',
    index: '04',
    title: 'MODULES &\nINVERTERS',
    label: 'Solar Equipment',
    description:
      'Reliable solar modules and inverter solutions selected to support efficient and dependable system performance.',
    variant: 'secondary',
    featureDetail: 'High-Efficiency Mono PERC & TOPCon Panels • Smart String Inverters',
  },
  {
    id: 'amc-maintenance',
    index: '05',
    title: 'AMC &\nMAINTENANCE',
    label: 'Service • Support',
    description:
      'Ongoing system support and maintenance services to help keep solar installations operating effectively over time.',
    variant: 'secondary',
    featureDetail: 'System Health • Thermal Inspections • Panel Cleaning Contracts',
  },
  {
    id: 'bos-materials',
    index: '06',
    title: 'BOS MATERIALS',
    label: 'Components • Installation',
    description:
      'Essential balance-of-system components required for safe, organized and professional solar installations.',
    variant: 'wide',
    tags: ['Cables', 'HDG Mounting Structures', 'Protection DBs', 'Grid Connections'],
  },
];
