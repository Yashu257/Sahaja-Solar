import React, { useState, useRef, useEffect } from 'react';
import { useAssistant } from '../AssistantContext';
import { Send, Sun, Sparkles, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AssistantChatWindowProps {
  className?: string;
  isFloating?: boolean;
}

export const AssistantChatWindow: React.FC<AssistantChatWindowProps> = ({
  className,
  isFloating = false,
}) => {
  const { messages, isTyping, sendMessage, executeAction, resetChat } = useAssistant();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  return (
    <div
      className={cn(
        'flex flex-col bg-surface-card rounded-card border border-surface-border shadow-2xl overflow-hidden',
        isFloating ? 'h-full' : 'min-h-[500px] md:min-h-[580px]',
        className
      )}
    >
      {/* Header Bar */}
      <div className="bg-surface-dark text-white p-4 px-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-brand-gold shadow-gold-glow">
            <Sun className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm tracking-wide text-white">ASK SAHAJA</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-slate-300 block">AI Solar Assistant</span>
          </div>
        </div>

        <button
          onClick={resetChat}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors p-1.5 rounded-lg hover:bg-white/10"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-surface-bg/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={cn('flex flex-col max-w-[88%] sm:max-w-[80%]', isUser ? 'ml-auto items-end' : 'mr-auto items-start')}
            >
              {/* Message Bubble */}
              <div
                className={cn(
                  'p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-subtle',
                  isUser
                    ? 'bg-brand-green text-white rounded-br-none'
                    : 'bg-surface-card text-content-primary border border-surface-border rounded-bl-none'
                )}
              >
                {msg.text}
              </div>

              {/* Quick Actions Buttons */}
              {msg.quickActions && msg.quickActions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 pl-1">
                  {msg.quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => executeAction(action)}
                      className="py-1.5 px-3 rounded-full text-xs font-heading font-bold bg-brand-green-light text-brand-green border border-brand-green/20 hover:bg-brand-green hover:text-white transition-all shadow-subtle flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-brand-gold" />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="mr-auto items-start flex gap-1.5 p-3 px-4 rounded-2xl bg-surface-card border border-surface-border text-content-muted">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer Form */}
      <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-surface-card border-t border-surface-border">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about solar, subsidies, or installation..."
            className="flex-1 bg-surface-muted border border-surface-border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand-green"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="w-10 h-10 rounded-xl bg-brand-green text-brand-gold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-green-dark transition-colors shadow-subtle flex-shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-2 text-[10px] text-content-muted text-center leading-tight">
          By sharing details, you agree that Sahaja Solar may contact you regarding your solar enquiry.
        </div>
      </form>
    </div>
  );
};
