
/**
 * Lead Enrichment Engine page
 * Allows users to add and enrich leads with AI-powered data
 */
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Plus, Upload, Search, Filter, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

/**
 * Lead enrichment interface with bulk upload and individual addition
 */
export function LeadEnrichment() {
  const { state, dispatch } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newLead, setNewLead] = useState({ name: '', email: '' });

  const handleAddLead = () => {
    if (newLead.name && newLead.email) {
      const enrichedLead = {
        id: Date.now().toString(),
        name: newLead.name,
        email: newLead.email,
        phone: `+1-555-${Math.random().toString().slice(2, 6)}`,
        linkedin: `linkedin.com/in/${newLead.name.toLowerCase().replace(' ', '')}`,
        title: 'Decision Maker',
        company: 'Tech Company',
        companySize: '100-500',
        industry: 'Technology',
        location: 'San Francisco, CA',
        score: Math.floor(Math.random() * 40) + 60,
        status: 'enriched' as const
      };

      dispatch({ type: 'ADD_LEAD', payload: enrichedLead });
      setNewLead({ name: '', email: '' });
      setShowAddForm(false);
    }
  };

  const filteredLeads = state.leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Lead Enrichment Engine</h1>
          <p className="text-cyan-400">Add and enrich leads with AI-powered data</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className="bg-transparent border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
          >
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Add Lead Form */}
      {showAddForm && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Add New Lead</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              placeholder="Full Name"
              value={newLead.name}
              onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
              className="bg-gray-700/50 border-cyan-500/30 text-white"
            />
            <Input
              placeholder="Email Address"
              type="email"
              value={newLead.email}
              onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
              className="bg-gray-700/50 border-cyan-500/30 text-white"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={handleAddLead} className="bg-cyan-500 hover:bg-cyan-600 text-white border-0">
              Enrich Lead
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAddForm(false)}
              className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700/50"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700/50 border-cyan-500/30 text-white pl-10"
            />
          </div>
          <Button variant="outline" className="bg-transparent border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="bg-transparent border-green-500/30 text-green-400 hover:bg-green-500/10">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/20">
                <th className="text-left p-4 text-cyan-400 font-semibold">Lead</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Contact</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Company</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Score</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
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
                    <p className="text-white">{lead.email}</p>
                    <p className="text-gray-400 text-sm">{lead.phone}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-white">{lead.company}</p>
                    <p className="text-gray-400 text-sm">{lead.industry} • {lead.companySize}</p>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      lead.score && lead.score >= 80 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : lead.score && lead.score >= 60
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {lead.score}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      lead.status === 'qualified'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : lead.status === 'contacted'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : lead.status === 'enriched'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{state.leads.length}</p>
          <p className="text-cyan-400 text-sm">Total Leads</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {state.leads.filter(l => l.score && l.score >= 80).length}
          </p>
          <p className="text-green-400 text-sm">Hot Leads</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {state.leads.filter(l => l.status === 'contacted').length}
          </p>
          <p className="text-blue-400 text-sm">Contacted</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {state.leads.filter(l => l.status === 'qualified').length}
          </p>
          <p className="text-purple-400 text-sm">Qualified</p>
        </div>
      </div>
    </div>
  );
}
