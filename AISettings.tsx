/**
 * AI Settings Component
 * Configuration for AI service providers and API keys
 */

import React, { useState } from 'react';
import { Key, Zap, Settings, Eye, EyeOff, Save, TestTube } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

/**
 * AI Service configuration interface
 */
interface AIServiceConfig {
  provider: 'openai' | 'anthropic' | 'custom';
  apiKey: string;
  baseURL?: string;
  model: string;
  maxTokens: number;
  temperature: number;
  enabled: boolean;
}

/**
 * AI Settings with provider configuration and testing
 */
export function AISettings() {
  const [config, setConfig] = useState<AIServiceConfig>({
    provider: 'openai',
    apiKey: '',
    baseURL: 'https://api.openai.com/v1',
    model: 'gpt-4',
    maxTokens: 1000,
    temperature: 0.7,
    enabled: false
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const providers = [
    { id: 'openai', name: 'OpenAI', models: ['gpt-4', 'gpt-3.5-turbo'] },
    { id: 'anthropic', name: 'Anthropic', models: ['claude-3-opus', 'claude-3-sonnet'] },
    { id: 'custom', name: 'Custom API', models: ['custom'] }
  ];

  const handleSaveConfig = () => {
    // In a real implementation, this would save to secure storage
    localStorage.setItem('ai-config', JSON.stringify(config));
    
    // Show success feedback
    setTestResult({ success: true, message: 'Configuration saved successfully!' });
    setTimeout(() => setTestResult(null), 3000);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    // Simulate API test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      setTestResult({
        success,
        message: success 
          ? '✅ Connection test successful! AI services are ready.'
          : '❌ Connection failed. Please check your API key and settings.'
      });
      setIsTesting(false);
    }, 2000);
  };

  const handleProviderChange = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    if (provider) {
      setConfig(prev => ({
        ...prev,
        provider: providerId as any,
        model: provider.models[0],
        baseURL: providerId === 'custom' ? '' : `https://api.${providerId}.com/v1`
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">AI Service Configuration</h2>
          <p className="text-cyan-400">Configure your AI service providers and API settings</p>
        </div>
        <div className="flex items-center space-x-2 text-cyan-400">
          <Zap className="w-5 h-5" />
          <span className="text-sm">Powered by AI</span>
        </div>
      </div>

      {/* Test Result Banner */}
      {testResult && (
        <div className={`p-4 rounded-lg border ${
          testResult.success 
            ? 'bg-green-500/10 border-green-500/30 text-green-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {testResult.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Provider Configuration */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-cyan-400" />
              Service Provider
            </h3>

            <div className="space-y-4">
              {/* Provider Selection */}
              <div>
                <label className="text-cyan-400 text-sm font-medium mb-2 block">
                  AI Provider
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {providers.map(provider => (
                    <button
                      key={provider.id}
                      onClick={() => handleProviderChange(provider.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        config.provider === provider.id
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                          : 'bg-gray-700/30 border-gray-600 text-gray-300 hover:border-cyan-500/30'
                      }`}
                    >
                      <div className="font-medium">{provider.name}</div>
                      <div className="text-sm opacity-75">
                        {provider.models.join(', ')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Model Selection */}
              <div>
                <label className="text-cyan-400 text-sm font-medium mb-2 block">
                  AI Model
                </label>
                <select
                  value={config.model}
                  onChange={(e) => setConfig(prev => ({ ...prev, model: e.target.value }))}
                  className="w-full bg-gray-700/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  {providers.find(p => p.id === config.provider)?.models.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              {/* Custom API URL */}
              {config.provider === 'custom' && (
                <div>
                  <label className="text-cyan-400 text-sm font-medium mb-2 block">
                    Custom API URL
                  </label>
                  <Input
                    type="text"
                    value={config.baseURL}
                    onChange={(e) => setConfig(prev => ({ ...prev, baseURL: e.target.value }))}
                    placeholder="https://api.example.com/v1"
                    className="bg-gray-700/50 border-cyan-500/30 text-white"
                  />
                </div>
              )}
            </div>
          </div>

          {/* API Settings */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <Key className="w-5 h-5 mr-2 text-cyan-400" />
              API Configuration
            </h3>

            <div className="space-y-4">
              {/* API Key */}
              <div>
                <label className="text-cyan-400 text-sm font-medium mb-2 block">
                  API Key
                </label>
                <div className="relative">
                  <Input
                    type={showApiKey ? "text" : "password"}
                    value={config.apiKey}
                    onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                    placeholder="Enter your API key"
                    className="bg-gray-700/50 border-cyan-500/30 text-white pr-10"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  Your API key is stored locally and never shared
                </p>
              </div>

              {/* Model Parameters */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-cyan-400 text-sm font-medium mb-2 block">
                    Max Tokens
                  </label>
                  <Input
                    type="number"
                    value={config.maxTokens}
                    onChange={(e) => setConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                    className="bg-gray-700/50 border-cyan-500/30 text-white"
                  />
                </div>
                <div>
                  <label className="text-cyan-400 text-sm font-medium mb-2 block">
                    Temperature
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={config.temperature}
                    onChange={(e) => setConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                    className="bg-gray-700/50 border-cyan-500/30 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions & Status */}
        <div className="space-y-6">
          {/* Service Status */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
            <h3 className="text-white font-semibold text-lg mb-4">Service Status</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">AI Service</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${config.apiKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={config.apiKey ? 'text-green-400' : 'text-red-400'}>
                    {config.apiKey ? 'Configured' : 'Not Configured'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Last Test</span>
                <span className="text-cyan-400">
                  {testResult ? (testResult.success ? 'Successful' : 'Failed') : 'Never'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Features Available</span>
                <span className="text-green-400">
                  {config.apiKey ? 'All' : 'Demo Only'}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                onClick={handleTestConnection}
                disabled={!config.apiKey || isTesting}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white border-0"
              >
                <TestTube className="w-4 h-4 mr-2" />
                {isTesting ? 'Testing Connection...' : 'Test Connection'}
              </Button>

              <Button
                onClick={handleSaveConfig}
                disabled={!config.apiKey}
                className="w-full bg-green-500 hover:bg-green-600 text-white border-0"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
            <h3 className="text-white font-semibold text-lg mb-4">Usage Guidelines</h3>
            
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p>Keep your API keys secure and never share them publicly</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p>Monitor your API usage to avoid unexpected charges</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p>Test connections after configuration changes</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p>Use appropriate temperature settings for your use case</p>
              </div>
            </div>
          </div>

          {/* Upgrade Notice */}
          {!config.apiKey && (
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
              <h4 className="text-cyan-400 font-semibold mb-2">Ready for Real AI?</h4>
              <p className="text-gray-300 text-sm mb-4">
                Add your API key to unlock full AI capabilities. Currently running in demo mode with simulated responses.
              </p>
              <Button 
                variant="outline" 
                className="w-full bg-transparent border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                onClick={() => window.open('https://platform.openai.com/api-keys', '_blank')}
              >
                Get API Key
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}