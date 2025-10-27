
/**
 * Main dashboard with overview metrics and quick actions
 * Provides a comprehensive view of sales performance and key metrics
 */
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  Users, 
  Mail, 
  Target, 
  TrendingUp, 
  Zap,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

/**
 * Dashboard overview component with key metrics and quick actions
 */
export function Dashboard() {
  const { state, dispatch } = useApp();

  const metrics = [
    {
      title: 'Total Leads',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'cyan'
    },
    {
      title: 'Email Sent',
      value: '856',
      change: '+8%',
      trend: 'up',
      icon: Mail,
      color: 'blue'
    },
    {
      title: 'Conversion Rate',
      value: '4.2%',
      change: '+1.2%',
      trend: 'up',
      icon: Target,
      color: 'green'
    },
    {
      title: 'Revenue Generated',
      value: '$24,580',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const quickActions = [
    {
      title: 'Enrich Leads',
      description: 'Add and enrich new leads',
      icon: Users,
      page: 'leads',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Generate Emails',
      description: 'Create AI-powered emails',
      icon: Mail,
      page: 'email',
      color: 'from-green-500 to-cyan-500'
    },
    {
      title: 'Build Sequences',
      description: 'Create automated campaigns',
      icon: Zap,
      page: 'sequences',
      color: 'from-purple-500 to-cyan-500'
    },
    {
      title: 'View Analytics',
      description: 'See performance insights',
      icon: TrendingUp,
      page: 'analytics',
      color: 'from-blue-500 to-purple-500'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-gray-800/50 to-cyan-900/20 rounded-2xl border border-cyan-500/30 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome back, Demo! 👋
            </h1>
            <p className="text-cyan-200">
              Your AI sales assistant is ready to help you generate more revenue.
            </p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-4 py-2">
            <p className="text-cyan-400 text-sm">Professional Plan</p>
            <p className="text-white font-semibold">{state.user.trialDays} days trial left</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown;
          
          return (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6 hover:border-cyan-500/40 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${metric.color}-500/10 border border-${metric.color}-500/20`}>
                  <Icon className={`w-5 h-5 text-${metric.color}-400`} />
                </div>
                <div className={`flex items-center space-x-1 text-${metric.trend === 'up' ? 'green' : 'red'}-400`}>
                  <TrendIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
              <p className="text-gray-400 text-sm">{metric.title}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <button
              key={index}
              onClick={() => dispatch({ type: 'SET_PAGE', payload: action.page })}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6 text-left hover:border-cyan-500/40 hover:scale-105 transition-all duration-200 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{action.title}</h3>
              <p className="text-cyan-200 text-sm">{action.description}</p>
            </button>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
        <h2 className="text-white font-bold text-xl mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {state.leads.slice(0, 3).map((lead) => (
            <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-cyan-500/10">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-medium">{lead.name}</h4>
                  <p className="text-cyan-400 text-sm">{lead.company} • {lead.title}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  lead.score && lead.score >= 80 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : lead.score && lead.score >= 60
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  Score: {lead.score}
                </div>
                <p className="text-gray-400 text-sm mt-1">{lead.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
