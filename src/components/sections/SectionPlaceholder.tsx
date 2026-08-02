import React from 'react';
import { Card } from '@/components/ui/Card';
import { BadgeCheck } from 'lucide-react';

export interface SectionPlaceholderProps {
  sectionNumber: string;
  title: string;
  subtitle: string;
}

export const SectionPlaceholder: React.FC<SectionPlaceholderProps> = ({
  sectionNumber,
  title,
  subtitle,
}) => {
  return (
    <Card variant="outline" className="border-dashed border-brand-green/30 bg-surface-card/50 my-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="label-tag bg-brand-green-light text-brand-green px-2.5 py-1 rounded-md">
          Section {sectionNumber}
        </span>
        <span className="text-xs text-content-muted flex items-center gap-1">
          <BadgeCheck className="w-3.5 h-3.5 text-brand-gold" /> Architecture Ready
        </span>
      </div>
      <h3 className="h3 text-content-primary font-heading mb-1">{title}</h3>
      <p className="small-text text-content-secondary">{subtitle}</p>
    </Card>
  );
};
