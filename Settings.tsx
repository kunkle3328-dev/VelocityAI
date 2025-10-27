/**
 * Settings page for white-label customization and application configuration
 * Allows branding customization and system preferences
 */
import React, { useState } from 'react';
import { Save, Palette, Globe, Building, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';

interface WhiteLabelSettings {
  companyName: string;
  primaryColor: string;
  logo: string;
  customDomain: string;
  supportEmail: string;
}

/**
 * Settings interface for white-label customization and branding
 */
export function Settings() {
  const [settings, setSettings] = useState<WhiteLabelSettings>({
    companyName: 'AI Sales Assistant Pro',
    primaryColor: 'cyan',
    logo: '',
    customDomain: '',
    supportEmail: 'support@example.com'
  });

  const [activeTab, setActiveTab] = useState<'branding' | 'integrations' | 'security' | 'billing'>('branding');

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const colorOptions = [
    { value: 'cyan', label: 'Cyan', class: 'bg-cyan-500' },
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-cyan-400">Customize your AI Sales Assistant</p>
        </div>
        <Button 
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white border-0"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('branding')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'branding'
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Palette className="w-4 h-4" />
                  <span>Branding</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('integrations')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'integrations'
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4" />
                  <span>Integrations</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'security'
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Building className="w-4 h-4" />
                  <span>Security</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'billing'
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Building className="w-4 h-4" />
                  <span>Billing</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'branding' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">White-label Branding</h2>
              
              <div className="space-y-6">
                {/* Company Name */}
                <div>
                  <label className="text-cyan-400 text-sm font-medium mb-2 block">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    className="w-full bg-gray-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Primary Color */}
                <div>
                  <label className="text-cyan-400 text-sm font-medium mb-3 block">
                    Primary Color
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSettings({ ...settings, primaryColor: color.value })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          settings.primaryColor === color.value
                            ? 'border-cyan-500 ring-2 ring-cyan-500/20'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className={`w-full h-8 rounded ${color.class}`}></div>
                        <p className="text-white text-sm mt-2">{color.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="text-cyan-400 text-sm font-medium mb-2 block">
                    Company Logo
                  </label>
                  <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Upload className="w-8 h-8 text-cyan-400" />
                      <div>
                        <p className="text-white font-medium">Upload Logo</p>
                        <p className="text-gray-400 text-sm">PNG, JPG up to 5MB</p>
                      </div>
                      <Button variant="outline" className="bg-transparent border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Custom Domain */}
                <div>
                  <label className="text-cyan-400 text-sm font-medium mb-2 block">
                    Custom Domain
                  </label>
                  <input
                    type="text"
                    placeholder="app.yourcompany.com"
                    value={settings.customDomain}
                    onChange={(e) => setSettings({ ...settings, customDomain: e.target.value })}
                    className="w-full bg-gray-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Support Email */}
                <div>
                  <label className="text-cyan-400 text-sm font-medium mb-2 block">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    className="w-full bg-gray-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Integrations</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700/30 rounded-lg border border-cyan-500/20">
                  <h3 className="text-white font-medium mb-2">Webhook URLs</h3>
                  <p className="text-cyan-400 text-sm mb-3">
                    Configure webhooks for real-time data sync with your systems
                  </p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="https://your-domain.com/webhook/leads"
                      className="w-full bg-gray-600/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    />
                    <Button variant="outline" className="bg-transparent border-green-500/30 text-green-400 hover:bg-green-500/10">
                      Test Webhook
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700/30 rounded-lg border border-cyan-500/20">
                  <h3 className="text-white font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-cyan-400 text-sm mb-3">
                    Enhance security with 2FA for all team members
                  </p>
                  <Button variant="outline" className="bg-transparent border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Billing & Subscription</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700/30 rounded-lg border border-cyan-500/20">
                  <h3 className="text-white font-medium mb-2">Current Plan</h3>
                  <p className="text-cyan-400 text-sm">Professional Plan - $149/month</p>
                  <Button variant="outline" className="mt-3 bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}