import React from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { ShieldCheck, Zap, Sun } from 'lucide-react';

export const IntroPlaceholder: React.FC = () => {
  return (
    <Section id="intro-placeholder" className="py-24 md:py-32 bg-surface-bg border-t border-surface-border relative">
      <Container>
        <div className="max-w-3xl mb-16">
          <span className="label-tag text-brand-green mb-3 block">SAHAJA SOLAR</span>
          <h2 className="h1 text-content-primary mb-6">
            Clean Energy. <br />
            <span className="text-brand-green">Built for Tomorrow.</span>
          </h2>
          <p className="body-large text-content-secondary">
            Sahaja Solar delivers end-to-end solar EPC, rooftop residential systems, commercial installations, and DISCOM government subsidy assistance across Andhra Pradesh and India.
          </p>
        </div>

        {/* Temporary Section Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default" className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-green-light text-brand-green flex items-center justify-center mb-6">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="h3 text-content-primary mb-3">Residential Solar</h3>
              <p className="small-text text-content-secondary mb-4">
                High-efficiency Mono PERC rooftop solar plants designed to slash home electricity bills by up to 90%.
              </p>
            </div>
            <span className="text-xs font-mono text-brand-green font-semibold">Ready for Section 05</span>
          </Card>

          <Card variant="default" className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-gold-light text-brand-gold-hover flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="h3 text-content-primary mb-3">Commercial EPC</h3>
              <p className="small-text text-content-secondary mb-4">
                Turnkey MW & KW industrial solar infrastructure powering factories, educational institutions, and businesses.
              </p>
            </div>
            <span className="text-xs font-mono text-brand-gold-hover font-semibold">Ready for Section 05</span>
          </Card>

          <Card variant="default" className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-green-light text-brand-green flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="h3 text-content-primary mb-3">PM Surya Ghar Subsidy</h3>
              <p className="small-text text-content-secondary mb-4">
                Complete documentation, DISCOM net-metering approvals, and government subsidy processing assistance.
              </p>
            </div>
            <span className="text-xs font-mono text-brand-green font-semibold">Ready for Section 08</span>
          </Card>
        </div>
      </Container>
    </Section>
  );
};
