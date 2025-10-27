
/**
 * AI-Powered Email Generator page
 * Generates personalized email variations based on lead data and preferences
 */
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Wand2, Copy, Send, Users, Settings } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useEmailGeneration } from '../hooks/useAI';

// Using API response structure from useEmailGeneration hook

/**
 * Email generator with AI-powered personalization
 */
export function EmailGenerator() {
  const { state } = useApp();
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [productDetails, setProductDetails] = useState('');
  const [emailType, setEmailType] = useState('cold-outreach');
  const [tone, setTone] = useState('professional');
  const { execute: generateEmails, data: emailResponse, loading: isGenerating, error: generationError } = useEmailGeneration();

  const handleGenerateEmails = () => {
    if (selectedLeads.length === 0 || !productDetails) return;

    setIsGenerating(true);
    
    // Simulate AI generation with timeout
    setTimeout(() => {
      const newEmails: EmailTemplate[] = [
        {
          id: '1',
          subject: `Quick question about ${productDetails.split(' ')[0]} at ${state.leads.find(l => l.id === selectedLeads[0])?.company}`,
          body: `Hi ${state.leads.find(l => l.id === selectedLeads[0])?.name},\n\nI noticed your role as ${state.leads.find(l => l.id === selectedLeads[0])?.title} at ${state.leads.find(l => l.id === selectedLeads[0])?.company} and thought you might be interested in our ${productDetails}.\n\nWe've helped similar companies in the ${state.leads.find(l => l.id === selectedLeads[0])?.industry} industry achieve significant results. Would you be open to a quick 15-minute chat next week?\n\nBest regards,\nDemo User`,
          tone: 'professional',
          personalization: ['company', 'title', 'industry']
        },
        {
          id: '2',
          subject: `${productDetails} for ${state.leads.find(l => l.id === selectedLeads[0])?.company}`,
          body: `Hello ${state.leads.find(l => l.id === selectedLeads[0])?.name},\n\nI'm reaching out because our ${productDetails} seems like a perfect fit for ${state.leads.find(l => l.id === selectedLeads[0])?.company}, especially given your focus on ${state.leads.find(l => l.id === selectedLeads[0])?.industry}.\n\nWe specialize in helping ${state.leads.find(l => l.id === selectedLeads[0])?.companySize} companies like yours streamline their operations. Are you available for a brief call to discuss potential synergies?\n\nLooking forward to connecting!\nDemo User`,
          tone: 'friendly',
          personalization: ['company', 'industry', 'companySize']
        },
        {
          id: '3',
          subject: `Opportunity: ${productDetails} - ${state.leads.find(l => l.id === selectedLeads[0])?.company}`,
          body: `Dear ${state.leads.find(l => l.id === selectedLeads[0])?.name},\n\nAs ${state.leads.find(l => l.id === selectedLeads[0])?.title} at ${state.leads.find(l => l.id === selectedLeads[0])?.company}, you understand the importance of innovation in ${state.leads.find(l => l.id === selectedLeads[0])?.industry}.\n\nOur ${productDetails} is specifically designed to address challenges faced by companies of your size (${state.leads.find(l => l.id === selectedLeads[0])?.companySize}). I'd appreciate 20 minutes of your time to demonstrate how we can help.\n\nSincerely,\nDemo User`,
          tone: 'direct',
          personalization: ['title', 'company', 'industry', 'companySize']
        }
      ];

      setGeneratedEmails(newEmails);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopyEmail = (email: EmailTemplate) => {
    navigator.clipboard.writeText(`${email.subject}\n\n${email.body}`);
  };

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev =>
      prev.includes(leadId)
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Email Generator</h1>
          <p className="text-cyan-400">Create personalized emails with AI magic</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white border-0">
          <Settings className="w-4 h-4 mr-2" />
          Templates
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Configuration */}
        <div className="lg:col-span-1 space-y-6">
          {/* Lead Selection */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-cyan-400" />
              Select Leads
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {state.leads.map((lead) => (
                <div
                  key={lead.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedLeads.includes(lead.id)
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                      : 'bg-gray-700/30 border-gray-600 text-gray-300 hover:border-cyan-500/30'
                  }`}
                  onClick={() => toggleLeadSelection(lead.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm opacity-75">{lead.company}</p>
                    </div>
                    {selectedLeads.includes(lead.id) && (
                      <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Configuration */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
            <h3 className="text-white font-semibold text-lg mb-4">Email Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-cyan-400 text-sm font-medium mb-2 block">
                  Product/Service Details
                </label>
                <textarea
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                  placeholder="Describe what you're offering..."
                  className="w-full h-24 bg-gray-700/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-cyan-400 text-sm font-medium mb-2 block">
                  Email Type
                </label>
                <select
                  value={emailType}
                  onChange={(e) => setEmailType(e.target.value)}
                  className="w-full bg-gray-700/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="cold-outreach">Cold Outreach</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="meeting-request">Meeting Request</option>
                  <option value="re-engagement">Re-engagement</option>
                </select>
              </div>

              <div>
                <label className="text-cyan-400 text-sm font-medium mb-2 block">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-gray-700/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="direct">Direct</option>
                  <option value="casual">Casual</option>
                </select>
              </div>

              <Button
                onClick={handleGenerateEmails}
                disabled={isGenerating || selectedLeads.length === 0 || !productDetails}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 disabled:opacity-50"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Emails'}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Generated Emails */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
            <h3 className="text-white font-semibold text-lg mb-4">Generated Emails</h3>
            
            {generationError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                <p className="text-red-400 text-sm">{generationError}</p>
              </div>
            )}

            {emailResponse?.emails?.length === 0 ? (
              <div className="text-center py-12">
                <Wand2 className="w-12 h-12 text-cyan-400 mx-auto mb-4 opacity-50" />
                <p className="text-cyan-400">Configure your email settings and generate AI-powered emails</p>
                <p className="text-gray-400 text-sm mt-2">Select leads and describe your offering to get started</p>
              </div>
            ) : (
              <div className="space-y-6">
                {emailResponse?.emails?.map((email) => (
                  <div key={email.id} className="bg-gray-700/30 rounded-lg border border-cyan-500/20 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-semibold">{email.subject}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs ${
                            email.tone === 'professional' 
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : email.tone === 'friendly'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          }`}>
                            {email.tone}
                          </span>
                          <span className="text-cyan-400 text-xs">
                            Personalized: {email.personalization.join(', ')}
                          </span>
                          <span className="text-green-400 text-xs">
                            {Math.round(email.confidence * 100)}% confidence
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => handleCopyEmail(email)}
                          className="bg-transparent border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button className="bg-green-500 hover:bg-green-600 text-white border-0">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded p-3">
                      <pre className="text-white text-sm whitespace-pre-wrap font-sans">
                        {email.body}
                      </pre>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                      <span>Tokens used: {email.tokensUsed}</span>
                      <span>AI Generated</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
