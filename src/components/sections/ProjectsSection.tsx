import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { SAHAJA_PROJECTS, ProjectItem, ProjectCategory } from '@/data/projectsData';
import { ProjectLightbox } from '@/components/ui/ProjectLightbox';
import { ArrowUpRight, MapPin, Zap, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: ProjectCategory[] = ['All', 'Residential', 'Commercial', 'Industrial'];

  const filteredProjects = SAHAJA_PROJECTS.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.projectType === activeCategory;
  });

  return (
    <Section id="projects" className="py-24 md:py-36 bg-surface-bg text-content-primary relative overflow-hidden">
      {/* Environmental Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-green/5 blur-3xl pointer-events-none -z-10" />

      <Container>
        {/* Asymmetric Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-subtle animate-pulse" />
              <span className="label-tag text-brand-green font-bold tracking-widest">
                07 — OUR PROJECTS
              </span>
            </div>

            <h2 className="display-heading text-content-primary tracking-tight">
              SOLAR, <br />
              BUILT IN THE <span className="text-brand-green">REAL WORLD.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-md flex flex-col justify-between gap-4"
          >
            <p className="body-large text-content-secondary leading-relaxed">
              Explore solar installations delivered for homes, businesses and other energy requirements across Andhra Pradesh.
            </p>

            <span className="text-xs text-content-muted font-medium">
              Real engineering • High-efficiency PV modules • Grid net-metering
            </span>
          </motion.div>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-surface-border pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-heading font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
                activeCategory === cat
                  ? 'bg-brand-green text-white shadow-subtle'
                  : 'bg-surface-card text-content-secondary hover:text-content-primary border border-surface-border'
              )}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Aceternity Focus Cards Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 mb-20 md:mb-28"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isFocused = hoveredProjectId === project.id;
              const isAnyHovered = hoveredProjectId !== null;

              // Grid column span for desktop asymmetric composition
              const spanClass = idx === 0 ? 'lg:col-span-7 min-h-[420px] md:min-h-[500px]' : idx === 1 ? 'lg:col-span-5 min-h-[420px] md:min-h-[500px]' : 'lg:col-span-6 min-h-[380px] md:min-h-[440px]';

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isAnyHovered ? (isFocused ? 1 : 0.65) : 1,
                    scale: isFocused ? 1.02 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  onMouseEnter={() => {
                    if (!window.matchMedia('(pointer: coarse)').matches) {
                      setHoveredProjectId(project.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!window.matchMedia('(pointer: coarse)').matches) {
                      setHoveredProjectId(null);
                    }
                  }}
                  onClick={() => setSelectedProject(project)}
                  className={cn(
                    'relative rounded-card overflow-hidden bg-surface-dark text-white border border-surface-border shadow-subtle cursor-pointer group flex flex-col justify-between p-6 sm:p-8',
                    spanClass
                  )}
                >
                  {/* Project Photography */}
                  <div className="absolute inset-0 z-0 bg-surface-dark overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/95 via-surface-dark/40 to-black/30 pointer-events-none" />
                  </div>

                  {/* Top Header Bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-extrabold text-xs text-brand-gold font-mono tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {project.index}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-200 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {project.projectType}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Metadata */}
                  <div className="relative z-10 mt-auto pt-16">
                    <h3 className="h3 text-white font-heading font-bold mb-2 tracking-tight group-hover:text-brand-gold transition-colors duration-300">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mb-4 font-medium">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-green" />
                        {project.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 text-brand-gold font-bold">
                        <Zap className="w-3.5 h-3.5" />
                        {project.capacityKw} kW System
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-slate-200 uppercase tracking-wider group-hover:text-brand-gold group-hover:translate-x-1 transition-all duration-300">
                      <span>View Project Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Section Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-surface-border mt-20 md:mt-28 flex flex-col md:flex-row items-center justify-between gap-8 bg-surface-card p-8 md:p-12 rounded-card border border-surface-border shadow-subtle text-center md:text-left"
        >
          <div className="max-w-xl">
            <span className="label-tag text-brand-green block mb-2">CUSTOM SOLAR EPC</span>
            <h3 className="h2 text-content-primary font-heading tracking-tight mb-2">
              PLANNING A SOLAR PROJECT OF YOUR OWN?
            </h3>
            <p className="body-main text-content-secondary">
              Tell us about your property and energy requirements for a tailored engineering assessment and quote.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="solar"
              size="lg"
              showArrow
              className="shadow-gold-glow"
              onClick={() => {
                const target = document.querySelector('#quote');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get a Solar Quote
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const target = document.querySelector('#solar-calculator');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Calculate Your Solar
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* Accessible Project Lightbox Modal */}
      <ProjectLightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Section>
  );
};
