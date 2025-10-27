
/**
 * Top header with user menu and subscription information
 */
import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Bell, CreditCard, User, LogOut, Zap, Menu } from 'lucide-react';
import { Button } from '../ui/button';

/**
 * Header component with user controls and notifications
 */
export function Header() {
  const { state, dispatch } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handlePricingClick = () => {
    dispatch({ type: 'SET_PAGE', payload: 'pricing' });
  };

  return (
    <header className="h-16 bg-gray-900/50 backdrop-blur-lg border-b border-cyan-500/20 fixed top-0 right-0 left-64 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h1 className="text-white text-xl font-bold capitalize">
            {state.currentPage === 'dashboard' ? 'AI Sales Dashboard' : state.currentPage}
          </h1>
          <p className="text-cyan-400 text-sm">
            {state.user.trialDays} days left in trial
          </p>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Upgrade Button */}
          <Button 
            onClick={handlePricingClick}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0"
          >
            <Zap className="w-4 h-4 mr-2" />
            Upgrade Plan
          </Button>

          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Notification Dropdown */}
            <div className="absolute right-0 top-12 w-80 bg-gray-800/95 backdrop-blur-lg rounded-lg border border-cyan-500/20 shadow-xl py-2 z-50 hidden group-hover:block">
              <div className="px-4 py-2 border-b border-cyan-500/20">
                <h3 className="text-white font-semibold">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-gray-700/50 transition-colors">
                  <p className="text-white text-sm">New lead scored 95 - Sarah Johnson</p>
                  <p className="text-cyan-400 text-xs">2 minutes ago</p>
                </div>
                <div className="p-3 hover:bg-gray-700/50 transition-colors">
                  <p className="text-white text-sm">Email campaign completed: 42% open rate</p>
                  <p className="text-cyan-400 text-xs">1 hour ago</p>
                </div>
                <div className="p-3 hover:bg-gray-700/50 transition-colors">
                  <p className="text-white text-sm">CRM sync completed: 1247 leads updated</p>
                  <p className="text-cyan-400 text-xs">2 hours ago</p>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-cyan-500/20">
                <button className="text-cyan-400 text-sm hover:text-cyan-300 w-full text-center">
                  View All Notifications
                </button>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">DU</span>
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">Demo User</p>
                <p className="text-cyan-400 text-xs">{state.user.subscription}</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-12 w-48 bg-gray-800/95 backdrop-blur-lg rounded-lg border border-cyan-500/20 shadow-xl py-2 z-50">
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button 
                  onClick={handlePricingClick}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Billing & Plans</span>
                </button>
                <div className="border-t border-cyan-500/20 my-1"></div>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
