export type AdminRole = 'admin' | 'staff';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

export type AuthMode = 'MOCK' | 'PRODUCTION';

export interface SystemStatusReport {
  aiAssistantStatus: 'MOCK' | 'PRODUCTION';
  bookingProviderStatus: 'MOCK' | 'PRODUCTION';
  bookingPersistenceStatus: 'MOCK' | 'PRODUCTION';
  quoteProviderStatus: 'MOCK' | 'PRODUCTION';
  quotePersistenceStatus: 'MOCK' | 'PRODUCTION';
  businessEmailStatus: 'CONFIGURED_SERVERLESS' | 'MOCK';
  customerEmailStatus: 'NOT_CONFIGURED' | 'CONFIGURED';
  adminAuthStatus: 'MOCK' | 'PRODUCTION';
  whatsAppStatus: 'CONFIGURED_PRIMARY' | 'NEEDS_CONFIRMATION';
}

export interface AdminLeadNote {
  id: string;
  author: string;
  text: string;
  createdAt: number;
}
