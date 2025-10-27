
/**
 * Lead Scoring & Qualification page
 * AI-powered lead scoring with detailed insights
 */
import React from 'react';
import { useApp } from '../contexts/AppContext';

export function LeadScoring() {
  const { state } = useApp();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/30';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Lead Scoring</h1>
          <p className="text-cyan-400">AI-powered qualification and prioritization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {state.leads.filter(l => l.score && l.score >= 80).length}
          </p>
          <p className="text-green-400 text-sm">Hot Leads</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {state.leads.filter(l => l.score && l.score >= 60 && l.score < 80).length}
          </p>
          <p className="text-yellow-400 text-sm">Warm Leads</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {state.leads.filter(l => l.score && l.score < 60).length}
          </p>
          <p className="text-red-400 text-sm">Cold Leads</p>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {Math.round(state.leads.reduce((acc, lead) => acc + (lead.score || 0), 0) / state.leads.length)}
          </p>
          <p className="text-cyan-400 text-sm">Avg Score</p>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/20">
                <th className="text-left p-4 text-cyan-400 font-semibold">Lead</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Company</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Score</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Factors</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Priority</th>
              </tr>
            </thead>
            <tbody>
              {state.leads.map((lead) => (
                <tr key={lead.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{lead.name}</p>
                        <p className="text-cyan-400 text-sm">{lead.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-white">{lead.company}</p>
                    <p className="text-gray-400 text-sm">{lead.industry}</p>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getScoreBg(lead.score || 0)} ${getScoreColor(lead.score || 0)}`}>
                      {lead.score}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Company Size</span>
                        <span className="text-white">{lead.companySize}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Industry Fit</span>
                        <span className="text-green-400">High</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Engagement</span>
                        <span className="text-yellow-400">Medium</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      (lead.score || 0) >= 80
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : (lead.score || 0) >= 60
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {(lead.score || 0) >= 80 ? 'High' : (lead.score || 0) >= 60 ? 'Medium' : 'Low'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
