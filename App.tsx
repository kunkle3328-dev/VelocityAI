
/**
 * Main application component with routing and layout
 * Orchestrates the entire AI Sales Assistant application
 */
import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { MobileProvider } from './components/Layout/MobileProvider';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './pages/Dashboard';
import { LeadEnrichment } from './pages/LeadEnrichment';
import { EmailGenerator } from './pages/EmailGenerator';
import { FollowUpSequences } from './pages/FollowUpSequences';
import { CRMDashboard } from './pages/CRMDashboard';
import { LeadScoring } from './pages/LeadScoring';
import { Analytics } from './pages/Analytics';
import { Pricing } from './pages/Pricing';
import { TeamManagement } from './pages/TeamManagement';
import { Settings } from './pages/Settings';
import { useApp } from './contexts/AppContext';

/**
 * Main content router based on current page state
 */
function MainContent() {
  const { state } = useApp();

  const renderPage = () => {
    switch (state.currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadEnrichment />;
      case 'email':
        return <EmailGenerator />;
      case 'sequences':
        return <FollowUpSequences />;
      case 'crm':
        return <CRMDashboard />;
      case 'scoring':
        return <LeadScoring />;
      case 'analytics':
        return <Analytics />;
      case 'pricing':
        return <Pricing />;
      case 'team':
        return <TeamManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="flex-1 lg:ml-64 mt-16 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900/20">
      <div className="p-4 lg:p-6">
        {renderPage()}
      </div>
    </main>
  );
}

/**
 * Root application component
 */
export default function App() {
  return (
    <AppProvider>
      <MobileProvider>
        <div className="min-h-screen bg-gray-900 text-white flex">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <MainContent />
          </div>
        </div>
      </MobileProvider>
    </AppProvider>
  );
}
