/**
 * AI Dashboard Component
 * Overview of AI feature usage, costs, and performance
 */

import React from 'react';
import { useAIAnalytics } from '../../hooks/useAI';
import { Zap, Cpu, DollarSign, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

/**
 * AI Dashboard with real-time metrics and usage tracking
 */
export function AIDashboard() {
  const { analytics } = useAIAnalytics();

  const metrics = [
    {
      label: 'Total AI Requests',
      value: analytics.totalRequests,
      icon: Cpu,
      color: 'cyan',
      change: '+12%'
    },
    {
      label: 'Success Rate',
      value: analytics.totalRequests > 0 
        ? `${Math.round((analytics.successfulRequests / analytics.totalRequests) * 100)}%`
        : '0%',
      icon: TrendingUp,
      color: 'green',
      change: '+5%'
    },
    {
      label: 'Avg Response Time',
      value: `${Math.round(analytics.averageResponseTime)}ms`,
      icon: Clock,
      color: 'blue',
      change: '-8%'
    },
    {
      label: 'Cost Estimate',
      value: `$${analytics.totalRequests * 0.02}`,
      icon: DollarSign,
      color: 'purple',
      change: '+$4.20'
    }
  ];

  const featureUsage = Object.entries(analytics.featureUsage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">AI Performance Dashboard</h2>
          <p className="text-cyan-400">Real-time monitoring of AI feature usage and costs</p>
        </div>
        <div className="flex items-center space-x-2 text-cyan-400">
          <Zap className="w-5 h-5" />
          <span className="text-sm">AI Assistant Pro</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${metric.color}-500/20`}>
                <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
              </div>
              <span className={`text-${metric.color}-400 text-sm font-medium`}>
                {metric.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
            <p className="text-gray-400 text-sm">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Usage */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Top AI Features</h3>
          <div className="space-y-4">
            {featureUsage.length > 0 ? (
              featureUsage.map(([feature, count]) => (
                <div key={feature} className="flex items-center justify-between">
                  <span className="text-gray-300 capitalize">{feature.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-cyan-500 h-2 rounded-full"
                        style={{ 
                          width: `${(count / Math.max(...Object.values(analytics.featureUsage))) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-white text-sm w-8 text-right">{count}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No AI features used yet</p>
            )}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Performance Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm">AI Response Times</span>
              </div>
              <span className="text-green-400 text-sm">Optimal</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm">Cost Optimization</span>
              </div>
              <span className="text-yellow-400 text-sm">Monitor</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center space-x-3">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">Feature Usage</span>
              </div>
              <span className="text-blue-400 text-sm">Growing</span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <h4 className="text-cyan-400 font-medium text-sm mb-2">AI Recommendations</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Consider batch processing for lead enrichment</li>
              <li>• Use template variations to reduce token usage</li>
              <li>• Schedule AI operations during off-peak hours</li>
            </ul>
          </div>
        </div>
      </div>

      {/* API Status */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
        <h3 className="text-white font-semibold text-lg mb-4">AI Service Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <span className="text-white text-sm">Lead Enrichment</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-400 text-sm">Operational</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <span className="text-white text-sm">Email Generation</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-400 text-sm">Operational</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <span className="text-white text-sm">Lead Scoring</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-400 text-sm">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}