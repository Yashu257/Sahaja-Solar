export type ProjectCategory = 'All' | 'Residential' | 'Commercial' | 'Industrial';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  location: string;
  capacityKw: number;
  projectType: 'Residential' | 'Commercial' | 'Industrial';
  image: string;
  shortDescription: string;
  featured?: boolean;
  isPlaceholder?: boolean;
  completionDate?: string;
}

export const SAHAJA_PROJECTS: ProjectItem[] = [
  {
    id: 'res-solar-pamarru',
    index: '01',
    title: 'ROOFTOP RESIDENTIAL SOLAR PLANT',
    location: 'Andhra Pradesh',
    capacityKw: 5,
    projectType: 'Residential',
    image: '/assets/images/projects/project-res-1.jpg',
    shortDescription:
      'High-efficiency 5 kW rooftop Mono PERC solar installation with smart cloud inverter monitoring for home energy independence.',
    featured: true,
    isPlaceholder: true, // Clearly marked so production can filter or replace cleanly
    completionDate: '2026',
  },
  {
    id: 'com-solar-commercial',
    index: '02',
    title: 'COMMERCIAL ENTERPRISE SOLAR ARRAY',
    location: 'Andhra Pradesh',
    capacityKw: 50,
    projectType: 'Commercial',
    image: '/assets/images/projects/project-com-1.jpg',
    shortDescription:
      '50 kW turnkey commercial rooftop solar EPC system slashing operating expenditures for business infrastructure.',
    featured: false,
    isPlaceholder: true,
    completionDate: '2026',
  },
  {
    id: 'ind-solar-facility',
    index: '03',
    title: 'INDUSTRIAL WAREHOUSE SOLAR SYSTEM',
    location: 'Andhra Pradesh',
    capacityKw: 100,
    projectType: 'Industrial',
    image: '/assets/images/projects/project-ind-1.jpg',
    shortDescription:
      '100 kW MW-scale industrial rooftop installation with HDG mounting structures and grid safety net-metering.',
    featured: false,
    isPlaceholder: true,
    completionDate: '2026',
  },
  {
    id: 'res-solar-suburban',
    index: '04',
    title: 'SUBURBAN HOME SOLAR ROOFTOP',
    location: 'Andhra Pradesh',
    capacityKw: 3,
    projectType: 'Residential',
    image: '/assets/images/projects/project-res-1.jpg',
    shortDescription:
      '3 kW PM Surya Ghar eligible rooftop solar plant for clean residential energy generation.',
    featured: false,
    isPlaceholder: true,
    completionDate: '2026',
  },
];
