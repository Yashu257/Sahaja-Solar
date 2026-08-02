import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { AssistantChatWindow } from './AssistantChatWindow';
import { useAssistant } from '../AssistantContext';
import { Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';

export const SolarAssistantSection: React.FC = () => {
  const { sendMessage } = useAssistant();

  const SUGGESTED_PROMPTS = [
    'How much solar capacity do I need?',
    'How does the rooftop subsidy process work?',
    'What is the difference between panels and inverters?',
    'What happens during installation?',
  ];

  return (
    <Section id="solar-assistant" dark className="py-24 md:py-36 bg-surface-dark text-white relative overflow-hidden">
      {/* Environmental Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-green/20 blur-3xl pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Editorial Introduction & Suggested Prompts (40%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-gold-glow animate-pulse" />
                <span className="label-tag text-brand-gold font-bold tracking-widest">
                  10 — SOLAR ASSISTANT
                </span>
              </div>

              <h2 className="display-heading text-white tracking-tight mb-4">
                HAVE A SOLAR <br />
                QUESTION? <br />
                <span className="text-brand-gold">ASK SAHAJA.</span>
              </h2>

              <p className="body-large text-slate-300 leading-relaxed mb-6">
                Get quick guidance about solar systems, costs, subsidies, installation and the next steps for your property.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-gold bg-brand-gold/10 px-3.5 py-1.5 rounded-full border border-brand-gold/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-POWERED SOLAR GUIDANCE</span>
              </div>
            </div>

            {/* Suggested Prompts List */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Suggested Questions
              </span>
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="w-full text-left p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold text-xs text-slate-200 font-medium transition-all duration-300 flex items-center justify-between group"
                >
                  <span>"{prompt}"</span>
                  <HelpCircle className="w-4 h-4 text-slate-500 group-hover:text-brand-gold transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>Verified data architecture • No fake pricing claims</span>
            </div>
          </motion.div>

          {/* Right Column: Large Interactive Assistant Window (60%) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <AssistantChatWindow />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
