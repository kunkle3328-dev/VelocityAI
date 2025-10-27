
/**
 * Global application state management context
 * Manages user data, navigation, and application state
 */
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// User subscription tier types
export type SubscriptionTier = 'starter' | 'professional' | 'enterprise';

// Lead data structure
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  title?: string;
  company?: string;
  companySize?: string;
  industry?: string;
  location?: string;
  score?: number;
  status: 'new' | 'enriched' | 'contacted' | 'qualified';
  lastContact?: Date;
}

// Application state
interface AppState {
  currentPage: string;
  user: {
    name: string;
    email: string;
    subscription: SubscriptionTier;
    trialDays: number;
  };
  leads: Lead[];
  campaigns: any[];
  crmConnections: {
    salesforce: boolean;
    hubspot: boolean;
    pipedrive: boolean;
    zoho: boolean;
  };
}

// Action types
type AppAction = 
  | { type: 'SET_PAGE'; payload: string }
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'UPDATE_LEAD'; payload: Lead }
  | { type: 'SET_LEADS'; payload: Lead[] }
  | { type: 'UPDATE_CRM_CONNECTION'; payload: { platform: string; connected: boolean } };

// Initial state
const initialState: AppState = {
  currentPage: 'dashboard',
  user: {
    name: 'Demo User',
    email: 'demo@example.com',
    subscription: 'professional',
    trialDays: 14
  },
  leads: [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1-555-0101',
      linkedin: 'linkedin.com/in/sarahjohnson',
      title: 'CTO',
      company: 'TechCorp Inc',
      companySize: '500-1000',
      industry: 'Technology',
      location: 'San Francisco, CA',
      score: 85,
      status: 'qualified'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@startup.io',
      phone: '+1-555-0102',
      linkedin: 'linkedin.com/in/mikechen',
      title: 'VP of Sales',
      company: 'StartupIO',
      companySize: '50-200',
      industry: 'SaaS',
      location: 'New York, NY',
      score: 72,
      status: 'contacted'
    }
  ],
  campaigns: [],
  crmConnections: {
    salesforce: false,
    hubspot: true,
    pipedrive: false,
    zoho: false
  }
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'ADD_LEAD':
      return { ...state, leads: [...state.leads, action.payload] };
    case 'UPDATE_LEAD':
      return {
        ...state,
        leads: state.leads.map(lead => 
          lead.id === action.payload.id ? action.payload : lead
        )
      };
    case 'SET_LEADS':
      return { ...state, leads: action.payload };
    case 'UPDATE_CRM_CONNECTION':
      return {
        ...state,
        crmConnections: {
          ...state.crmConnections,
          [action.payload.platform]: action.payload.connected
        }
      };
    default:
      return state;
  }
}

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook to use context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
