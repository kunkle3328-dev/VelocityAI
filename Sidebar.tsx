
/**
 * Fixed left sidebar navigation with neon accents
 * Provides navigation between all application modules
 */
import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  BarChart3, 
  Users, 
  Mail, 
  Workflow, 
  Link, 
  Target, 
  Settings,
  Zap
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'leads', label: 'Lead Enrichment', icon: Users },
  { id: 'email', label: 'Email Generator', icon: Mail },
  { id: 'sequences', label: 'Follow-Up Sequences', icon: Workflow },
  { id: 'crm', label: 'CRM Integration', icon: Link },
  { id: 'scoring', label: 'Lead Scoring', icon: Target },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'team', label: 'Team Management', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

/**
 * Main sidebar navigation component
 */
export function Sidebar() {
  const { state, dispatch } = useApp();

  return (
    <div className="w-64 bg-gray-900/80 backdrop-blur-lg border-r border-cyan-500/20 h-screen fixed left-0 top-0 z-50 lg:static lg:z-auto">
      {/* Logo */}
      <div className="p-6 border-b border-cyan-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-white font-bold text-lg">AI Sales</h1>
            <p className="text-cyan-400 text-xs">Assistant Pro</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = state.currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => dispatch({ type: 'SET_PAGE', payload: item.id })}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cyan-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">DU</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Demo User</p>
            <p className="text-cyan-400 text-xs truncate">Professional Plan</p>
          </div>
          <Settings className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
