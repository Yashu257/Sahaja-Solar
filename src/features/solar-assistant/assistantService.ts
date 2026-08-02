import {
  AssistantProvider,
  AssistantContextState,
  QuickAction,
  LeadStep,
} from './types';

export class MockAssistantProvider implements AssistantProvider {
  async sendMessage(
    userInput: string,
    _state: AssistantContextState
  ): Promise<{
    message: string;
    quickActions?: QuickAction[];
    leadStepUpdate?: LeadStep;
  }> {
    const text = userInput.trim().toLowerCase();

    if (text.includes('calc') || text.includes('bill') || text.includes('cost')) {
      return {
        message: 'Estimate system capacity requirements and potential savings using the Sahaja Solar Calculator.',
        quickActions: [
          { id: '1', label: 'Open Solar Calculator', actionType: 'OPEN_CALCULATOR' },
          { id: '2', label: 'Check Subsidy Info', actionType: 'CHECK_SUBSIDY' },
        ],
      };
    }

    return {
      message: 'I can guide you through solar system sizing, monthly savings estimates, government subsidy guidance, or connecting with Sahaja Solar technical advisors.',
      quickActions: [
        { id: '1', label: 'Calculate Savings', actionType: 'OPEN_CALCULATOR' },
        { id: '2', label: 'Get Free Quote', actionType: 'START_LEAD' },
        { id: '3', label: 'Book Site Survey', actionType: 'BOOK_CONSULTATION' },
      ],
    };
  }
}

export class ApiAssistantProvider implements AssistantProvider {
  async sendMessage(
    userInput: string,
    state: AssistantContextState
  ): Promise<{
    message: string;
    quickActions?: QuickAction[];
    leadStepUpdate?: LeadStep;
  }> {
    try {
      // Build history for context window
      const history = (state.messages || [])
        .filter((m) => !m.isTyping)
        .slice(-4)
        .map((m) => ({
          role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userInput,
          history,
          calculatorContext: state.activeContext?.calculatorResult,
          leadContext: {
            name: state.lead.name,
            location: state.lead.location,
            propertyType: state.lead.propertyType,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const action = data.action;

        const quickActions: QuickAction[] = [];

        if (action === 'OPEN_CALCULATOR') {
          quickActions.push({ id: '1', label: 'Calculate Savings', actionType: 'OPEN_CALCULATOR' });
          quickActions.push({ id: '2', label: 'Get Solar Quote', actionType: 'START_LEAD' });
        } else if (action === 'OPEN_QUOTE') {
          quickActions.push({ id: '1', label: 'Get Free Quote', actionType: 'START_LEAD' });
          quickActions.push({ id: '2', label: 'Book Consultation', actionType: 'BOOK_CONSULTATION' });
        } else if (action === 'OPEN_BOOKING') {
          quickActions.push({ id: '1', label: 'Book Site Visit', actionType: 'BOOK_CONSULTATION' });
          quickActions.push({ id: '2', label: 'Get Free Quote', actionType: 'START_LEAD' });
        } else {
          quickActions.push({ id: '1', label: 'Calculate Savings', actionType: 'OPEN_CALCULATOR' });
          quickActions.push({ id: '2', label: 'Get Free Quote', actionType: 'START_LEAD' });
          quickActions.push({ id: '3', label: 'Book Consultation', actionType: 'BOOK_CONSULTATION' });
        }

        return {
          message: data.reply || 'I am here to assist with your rooftop solar requirements in Andhra Pradesh.',
          quickActions,
        };
      }
    } catch (e) {
      // Local dev fallback if serverless endpoint is unhosted
    }

    const mock = new MockAssistantProvider();
    return mock.sendMessage(userInput, state);
  }
}
