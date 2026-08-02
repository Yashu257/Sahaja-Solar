import {
  MessagesSquare,
  MapPinned,
  DraftingCompass,
  FileText,
  Wrench,
  CircleCheck,
  Headphones,
} from 'lucide-react';
import React from 'react';

export interface ProcessStage {
  id: string;
  index: string;
  number: string;
  title: string;
  microLabel: string;
  description: string;
  icon: React.ElementType;
}

export const SOLAR_PROCESS_STAGES: ProcessStage[] = [
  {
    id: 'consultation',
    index: '01',
    number: '01',
    title: 'INITIAL CONSULTATION',
    microLabel: 'Understand Your Needs',
    description:
      'We begin by understanding your electricity usage, property requirements and solar goals.',
    icon: MessagesSquare,
  },
  {
    id: 'site-survey',
    index: '02',
    number: '02',
    title: 'SITE SURVEY',
    microLabel: 'Assess the Site',
    description:
      'Our team evaluates the site, available rooftop space and key installation requirements.',
    icon: MapPinned,
  },
  {
    id: 'system-design',
    index: '03',
    number: '03',
    title: 'SYSTEM DESIGN',
    microLabel: 'Plan the System',
    description:
      'A solar solution is planned around your energy requirements, available space and suitable system configuration.',
    icon: DraftingCompass,
  },
  {
    id: 'proposal-subsidy',
    index: '04',
    number: '04',
    title: 'PROPOSAL &\nSUBSIDY GUIDANCE',
    microLabel: 'Understand the Investment',
    description:
      'We provide the proposed system details and help customers understand applicable subsidy processes and documentation where relevant.',
    icon: FileText,
  },
  {
    id: 'installation',
    index: '05',
    number: '05',
    title: 'INSTALLATION',
    microLabel: 'Build the System',
    description:
      'The approved solar system is professionally installed using the planned equipment and system layout.',
    icon: Wrench,
  },
  {
    id: 'testing-commissioning',
    index: '06',
    number: '06',
    title: 'TESTING &\nCOMMISSIONING',
    microLabel: 'Bring Solar Online',
    description:
      'The installed system is checked and prepared for safe, reliable operation.',
    icon: CircleCheck,
  },
  {
    id: 'ongoing-support',
    index: '07',
    number: '07',
    title: 'ONGOING SUPPORT',
    microLabel: 'Support Beyond Installation',
    description:
      'After installation, Sahaja Solar remains available for system support and maintenance requirements.',
    icon: Headphones,
  },
];
