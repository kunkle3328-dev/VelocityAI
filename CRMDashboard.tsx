
/**
 * CRM Integration Dashboard page
 * Manage connections to various CRM platforms
 */
import React from 'react';
import { useApp } from '../contexts/AppContext';

export function CRMDashboard() {
  const { state, dispatch } = useApp();

  const crmPlatforms = [
    { name: 'Salesforce', connected: state.crmConnections.salesforce, color: 'blue' },
    { name: 'HubSpot', connected: state.crmConnections.hubspot, color: 'orange' },
    { name: 'Pipedrive', connected: state.crmConnections.pipedrive, color: 'blue' },
    { name: 'Zoho', connected: state.crmConnections.zoho, color: 'red' }
  ];

  const toggleConnection = (platform: string) => {
    dispatch({
      type: 'UPDATE_CRM_CONNECTION',
      payload: {
        platform: platform.toLowerCase(),
        connected: !state.crmConnections[platform.toLowerCase() as keyof typeof state.crmConnections]
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">CRM Integration</h1>
          <p className="text-cyan-400">Connect and sync with your CRM platforms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {crmPlatforms.map((crm) => (
          <div key={crm.name} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">{crm.name}</h3>
              <div className={`w-3 h-3 rounded-full ${crm.connected ? 'bg-green-500' : 'bg-gray-500'}`}></div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status</span>
                <span className={crm.connected ? 'text-green-400' : 'text-gray-400'}>
                  {crm.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Last Sync</span>
                <span className="text-cyan-400">
                  {crm.connected ? '2 hours ago' : 'Never'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Leads Synced</span>
                <span className="text-white">
                  {crm.connected ? '1,247' : '0'}
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleConnection(crm.name)}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                crm.connected
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                  : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
              }`}
            >
              {crm.connected ? 'Disconnect' : 'Connect'} {crm.name}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
        <h3 className="text-white font-semibold text-lg mb-4">Sync Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <p className="text-2xl font-bold text-white">1,247</p>
            <p className="text-cyan-400 text-sm">Leads Synced</p>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-2xl font-bold text-white">856</p>
            <p className="text-green-400 text-sm">Activities Logged</p>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-2xl font-bold text-white">2h</p>
            <p className="text-blue-400 text-sm">Since Last Sync</p>
          </div>
        </div>
      </div>
    </div>
  );
}
