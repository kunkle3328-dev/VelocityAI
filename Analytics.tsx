
/**
 * Analytics Dashboard page
 * Visualize key metrics with modern charts and graphs
 */
import React from 'react';

export function Analytics() {
  const metrics = [
    { label: 'Email Open Rate', value: '42%', change: '+5%', trend: 'up' },
    { label: 'Response Rate', value: '8.2%', change: '+1.4%', trend: 'up' },
    { label: 'Click-through Rate', value: '3.1%', change: '-0.2%', trend: 'down' },
    { label: 'Conversion Rate', value: '4.2%', change: '+0.8%', trend: 'up' },
    { label: 'Revenue Generated', value: '$24,580', change: '+15%', trend: 'up' },
    { label: 'Avg Deal Size', value: '$5,200', change: '+12%', trend: 'up' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-cyan-400">Track performance and optimize your strategy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
            <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              <span className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Campaign Performance</h3>
          <div className="space-y-4">
            {['Cold Outreach Pro', 'Follow-up Sequence', 'Re-engagement', 'Meeting Requests'].map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <span className="text-white">{campaign}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-cyan-400 text-sm">42% open</span>
                  <span className="text-green-400 text-sm">8.2% reply</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Lead Source Breakdown</h3>
          <div className="space-y-3">
            {[
              { source: 'LinkedIn', percentage: 35, color: 'bg-blue-500' },
              { source: 'Website', percentage: 28, color: 'bg-green-500' },
              { source: 'Referrals', percentage: 18, color: 'bg-purple-500' },
              { source: 'Events', percentage: 12, color: 'bg-yellow-500' },
              { source: 'Other', percentage: 7, color: 'bg-gray-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">{item.source}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-sm w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Reporting & Export Section */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-cyan-500/20 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Advanced Analytics & Export</h2>
              <p className="text-cyan-400">Generate detailed reports and export data</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
              <button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 px-4 rounded-lg border border-green-500/30 transition-colors flex items-center space-x-2">
                <span>Export CSV</span>
                <span>📊</span>
              </button>
              <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 px-4 rounded-lg border border-blue-500/30 transition-colors flex items-center space-x-2">
                <span>Generate PDF</span>
                <span>📄</span>
              </button>
              <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-2 px-4 rounded-lg border border-purple-500/30 transition-colors flex items-center space-x-2">
                <span>Schedule Report</span>
                <span>⏰</span>
              </button>
              <button className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-2 px-4 rounded-lg border border-cyan-500/30 transition-colors flex items-center space-x-2">
                <span>API Export</span>
                <span>🔗</span>
              </button>
            </div>
          </div>

          {/* Report Templates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
              <h3 className="text-white font-medium mb-2">Monthly Performance</h3>
              <p className="text-gray-400 text-sm mb-3">Complete overview of all metrics</p>
              <button className="text-cyan-400 text-sm hover:text-cyan-300">Generate →</button>
            </div>
            <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
              <h3 className="text-white font-medium mb-2">Campaign ROI</h3>
              <p className="text-gray-400 text-sm mb-3">Revenue attribution by campaign</p>
              <button className="text-cyan-400 text-sm hover:text-cyan-300">Generate →</button>
            </div>
            <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
              <h3 className="text-white font-medium mb-2">Team Performance</h3>
              <p className="text-gray-400 text-sm mb-3">Individual contributor metrics</p>
              <button className="text-cyan-400 text-sm hover:text-cyan-300">Generate →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
