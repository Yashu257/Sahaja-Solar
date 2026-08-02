import React, { useEffect } from 'react';
import { useAssistant } from '../AssistantContext';
import { AssistantChatWindow } from './AssistantChatWindow';
import { Sun, MessageCircle, X } from 'lucide-react';
import { SAHAJA_COMPANY_INFO } from '@/data/siteConfig';

export const FloatingAssistantLauncher: React.FC = () => {
  const { isOpen, toggleAssistant, closeAssistant } = useAssistant();

  const primaryPhone = SAHAJA_COMPANY_INFO.contacts[0].rawPhone; // 8019604025
  const defaultMsg = encodeURIComponent("Hi Sahaja Solar, I'm interested in rooftop solar for my property and would like a consultation.");
  const whatsappUrl = `https://wa.me/91${primaryPhone}?text=${defaultMsg}`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeAssistant();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeAssistant]);

  return (
    <>
      {/* Floating Coordinated Launchers (WhatsApp + Ask Sahaja) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-3">
        {/* WhatsApp Quick Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-subtle flex items-center gap-1.5 transition-all duration-300 border border-emerald-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Chat with Sahaja Solar on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 text-white" />
          <span className="font-heading font-bold text-[10px] tracking-wider uppercase">
            WhatsApp
          </span>
        </a>

        {/* Ask Sahaja AI Assistant Button */}
        <button
          onClick={toggleAssistant}
          className="h-9 px-3 rounded-full bg-brand-green text-white shadow-gold-glow flex items-center gap-2 hover:bg-brand-green-dark transition-all duration-300 border border-brand-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          aria-label="Open Ask Sahaja AI Assistant"
        >
          <div className="w-5 h-5 rounded-full bg-brand-gold text-brand-green flex items-center justify-center flex-shrink-0">
            <Sun className="w-3 h-3 animate-spin-slow" />
          </div>
          <span className="font-heading font-bold text-[10px] tracking-wider uppercase">
            ASK SAHAJA
          </span>
        </button>
      </div>

      {/* Floating Drawer / Panel Overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Sahaja Solar AI Assistant Chat"
          className="fixed inset-0 z-50 flex items-end sm:items-auto justify-end p-0 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={closeAssistant}
        >
          <div
            className="w-full sm:w-[420px] h-[100dvh] sm:h-[600px] sm:max-h-[85vh] bg-surface-card rounded-t-card sm:rounded-card border border-surface-border shadow-2xl overflow-hidden flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button overlay header */}
            <button
              onClick={closeAssistant}
              className="absolute top-3.5 right-3.5 z-30 w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>

            <AssistantChatWindow isFloating className="h-full" />
          </div>
        </div>
      )}
    </>
  );
};
