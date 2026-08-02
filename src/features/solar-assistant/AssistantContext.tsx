import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  AssistantMessage,
  SolarLead,
  QuickAction,
  AssistantContextState,
} from './types';
import { ApiAssistantProvider } from './assistantService';

interface AssistantContextType extends AssistantContextState {
  sendMessage: (text: string) => Promise<void>;
  executeAction: (action: QuickAction) => void;
  openAssistant: () => void;
  closeAssistant: () => void;
  toggleAssistant: () => void;
  resetChat: () => void;
}

const INITIAL_MESSAGES: AssistantMessage[] = [
  {
    id: 'welcome-1',
    sender: 'assistant',
    text: "Hi! I'm Sahaja Solar's AI assistant. I can help you understand solar systems, estimated requirements, subsidies, installation and the next steps for your property. What would you like to know?",
    timestamp: Date.now(),
    quickActions: [
      { id: 'q1', label: 'Calculate My Solar', actionType: 'OPEN_CALCULATOR' },
      { id: 'q2', label: 'Check Subsidy', actionType: 'CHECK_SUBSIDY' },
      { id: 'q3', label: 'Explore Solutions', actionType: 'VIEW_SERVICES' },
      { id: 'q4', label: 'Installation Process', actionType: 'VIEW_PROCESS' },
      { id: 'q5', label: 'Talk to Team', actionType: 'START_LEAD' },
    ],
  },
];

const INITIAL_LEAD: SolarLead = {
  step: 'idle',
  createdAt: Date.now(),
};

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

const provider = new ApiAssistantProvider();

export const AssistantProviderComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<AssistantMessage[]>(INITIAL_MESSAGES);
  const [lead, setLead] = useState<SolarLead>(INITIAL_LEAD);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const currentState: AssistantContextState = {
        messages: [...messages, userMsg],
        lead,
        isOpen,
        isTyping: true,
      };

      const res = await provider.sendMessage(text, currentState);

      if (res.leadStepUpdate) {
        setLead((prev) => ({ ...prev, step: res.leadStepUpdate! }));
      }

      const assistantMsg: AssistantMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: res.message,
        timestamp: Date.now(),
        quickActions: res.quickActions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: AssistantMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "I couldn't respond right now. Please try again or contact Sahaja Solar advisors directly.",
        timestamp: Date.now(),
        quickActions: [{ id: 'err-call', label: 'Call Sahaja Team', actionType: 'START_LEAD' }],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const executeAction = (action: QuickAction) => {
    switch (action.actionType) {
      case 'OPEN_CALCULATOR': {
        const el = document.querySelector('#solar-calculator');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'CHECK_SUBSIDY': {
        const el = document.querySelector('#subsidy');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'VIEW_SERVICES': {
        const el = document.querySelector('#solutions');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'VIEW_PROCESS': {
        const el = document.querySelector('#solar-process');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'VIEW_PROJECTS': {
        const el = document.querySelector('#projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'VIEW_PRODUCTS': {
        const el = document.querySelector('#products');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'START_LEAD': {
        const el = document.querySelector('#quote');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'BOOK_CONSULTATION': {
        const el = document.querySelector('#booking');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      default:
        break;
    }
  };

  const openAssistant = () => setIsOpen(true);
  const closeAssistant = () => setIsOpen(false);
  const toggleAssistant = () => setIsOpen((prev) => !prev);
  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setLead(INITIAL_LEAD);
  };

  return (
    <AssistantContext.Provider
      value={{
        messages,
        lead,
        isOpen,
        isTyping,
        sendMessage,
        executeAction,
        openAssistant,
        closeAssistant,
        toggleAssistant,
        resetChat,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error('useAssistant must be used within an AssistantProviderComponent');
  }
  return context;
};
