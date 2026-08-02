import React, { useEffect } from 'react';
import { ProjectItem } from '@/data/projectsData';
import { X, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ProjectLightboxProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-surface-dark/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-surface-card rounded-card border border-surface-border shadow-2xl overflow-hidden flex flex-col md:flex-row my-auto max-h-[90vh] text-content-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-surface-dark/80 text-white hover:bg-brand-green flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Half */}
        <div className="w-full md:w-1/2 min-h-[250px] sm:min-h-[320px] relative bg-surface-dark overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 font-mono text-xs text-brand-gold font-bold bg-black/60 px-3 py-1 rounded-full border border-white/10">
            {project.index} — {project.projectType}
          </div>
        </div>

        {/* Details Half */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green-light px-3 py-1 rounded-full">
                {project.projectType} Installation
              </span>
              {project.isPlaceholder && (
                <span className="text-[10px] font-mono text-content-muted">Dev Showcase</span>
              )}
            </div>

            <h3 className="h3 font-heading font-bold text-content-primary mb-4 tracking-tight">
              {project.title}
            </h3>

            {/* Metadata Stats */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-surface-muted border border-surface-border mb-6 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-green" />
                <div>
                  <span className="text-content-muted block text-[10px]">Location</span>
                  <span className="font-bold text-content-primary">{project.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-gold" />
                <div>
                  <span className="text-content-muted block text-[10px]">System Capacity</span>
                  <span className="font-bold text-content-primary">{project.capacityKw} kW</span>
                </div>
              </div>
            </div>

            <p className="body-main text-content-secondary leading-relaxed mb-6">
              {project.shortDescription}
            </p>
          </div>

          <div className="pt-6 border-t border-surface-border flex items-center justify-between gap-4">
            <Button
              variant="solar"
              size="sm"
              className="w-full"
              showArrow
              onClick={() => {
                onClose();
                const target = document.querySelector('#quote');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Request Similar Project Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
