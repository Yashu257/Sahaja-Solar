import { PropertyType } from '@/features/solar-calculator/types';

export type ActionType =
  | 'OPEN_CALCULATOR'
  | 'CHECK_SUBSIDY'
  | 'VIEW_SERVICES'
  | 'VIEW_PROCESS'
  | 'VIEW_PROJECTS'
  | 'VIEW_PRODUCTS'
  | 'START_LEAD'
  | 'CALL_TEAM'
  | 'BOOK_CONSULTATION';

export interface QuickAction {
  id: string;
  label: string;
  actionType: ActionType;
  payload?: any;
}

export interface AssistantMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: number;
  quickActions?: QuickAction[];
  isTyping?: boolean;
}

export type LeadStep = 'idle' | 'name' | 'phone' | 'propertyType' | 'location' | 'monthlyBill' | 'summary' | 'completed';

export interface SolarLead {
  name?: string;
  phone?: string;
  email?: string;
  propertyType?: PropertyType;
  location?: string;
  monthlyBill?: number;
  interestedCapacityKw?: number;
  conversationSummary?: string;
  step: LeadStep;
  createdAt: number;
}

export interface AssistantContextState {
  messages: AssistantMessage[];
  lead: SolarLead;
  isOpen: boolean; // For floating drawer
  isTyping: boolean;
  activeContext?: {
    calculatorResult?: any;
    currentSection?: string;
  };
}

export interface AssistantProvider {
  sendMessage(
    userInput: string,
    state: AssistantContextState
  ): Promise<{
    message: string;
    quickActions?: QuickAction[];
    leadStepUpdate?: LeadStep;
  }>;
}
