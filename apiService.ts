/**
 * API Service Layer
 * Centralized service for handling all AI API integrations
 * Structured for easy upgrade to real API calls
 */

// Types for API requests and responses
export interface AIRequest {
  endpoint: string;
  data: any;
  headers?: Record<string, string>;
}

export interface AIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  usage?: {
    tokens: number;
    cost: number;
  };
}

export interface LeadEnrichmentRequest {
  emails: string[];
  enrichCompany?: boolean;
  enrichSocial?: boolean;
}

export interface LeadEnrichmentResponse {
  leads: Array<{
    email: string;
    name: string;
    title: string;
    company: string;
    companySize: string;
    industry: string;
    location: string;
    linkedin: string;
    phone: string;
    confidence: number;
  }>;
}

export interface EmailGenerationRequest {
  lead: any;
  productDetails: string;
  emailType: 'cold-outreach' | 'follow-up' | 'meeting-request' | 're-engagement';
  tone: 'professional' | 'friendly' | 'direct' | 'casual';
  personalizationLevel: 'minimal' | 'moderate' | 'high';
}

export interface EmailGenerationResponse {
  emails: Array<{
    id: string;
    subject: string;
    body: string;
    tone: string;
    personalization: string[];
    confidence: number;
    tokensUsed: number;
  }>;
}

export interface LeadScoringRequest {
  leads: Array<{
    id: string;
    company: string;
    industry: string;
    companySize: string;
    title: string;
    engagement: number;
  }>;
}

export interface LeadScoringResponse {
  scores: Array<{
    leadId: string;
    score: number;
    factors: Array<{
      factor: string;
      weight: number;
      reason: string;
    }>;
    recommendations: string[];
  }>;
}

export interface SequenceGenerationRequest {
  sequenceType: string;
  targetAudience: string;
  goals: string[];
  steps: number;
}

export interface SequenceGenerationResponse {
  sequence: {
    id: string;
    name: string;
    steps: Array<{
      step: number;
      type: 'email' | 'call' | 'task' | 'wait';
      content: any;
      timing: string;
    }>;
    estimatedCompletion: string;
    successRate: number;
  };
}

/**
 * Mock API Service - Simulates real API calls
 * Replace with actual API calls when upgrading
 */
class MockAPIService {
  private baseDelay = 1000;
  private successRate = 0.95;

  private async simulateAPI<T>(data: T, customDelay?: number): Promise<AIResponse<T>> {
    const delay = customDelay || this.baseDelay + Math.random() * 1000;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() < this.successRate;
        
        if (success) {
          resolve({
            success: true,
            data,
            usage: {
              tokens: Math.floor(Math.random() * 1000) + 100,
              cost: Math.random() * 0.5
            }
          });
        } else {
          resolve({
            success: false,
            error: 'API rate limit exceeded. Please try again in a moment.'
          });
        }
      }, delay);
    });
  }

  /**
   * Enrich lead data with AI-powered information
   */
  async enrichLeads(request: LeadEnrichmentRequest): Promise<AIResponse<LeadEnrichmentResponse>> {
    const mockResponse: LeadEnrichmentResponse = {
      leads: request.emails.map(email => ({
        email,
        name: this.generateName(email),
        title: this.generateTitle(),
        company: this.generateCompany(),
        companySize: this.generateCompanySize(),
        industry: this.generateIndustry(),
        location: this.generateLocation(),
        linkedin: `linkedin.com/in/${email.split('@')[0]}`,
        phone: this.generatePhone(),
        confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
      }))
    };

    return this.simulateAPI(mockResponse, 2000);
  }

  /**
   * Generate personalized emails using AI
   */
  async generateEmails(request: EmailGenerationRequest): Promise<AIResponse<EmailGenerationResponse>> {
    const { lead, productDetails, emailType, tone, personalizationLevel } = request;
    
    const mockEmails = [
      {
        id: '1',
        subject: this.generateSubject(lead, productDetails, emailType, tone),
        body: this.generateEmailBody(lead, productDetails, emailType, tone, personalizationLevel),
        tone,
        personalization: this.getPersonalizationFactors(lead, personalizationLevel),
        confidence: Math.random() * 0.2 + 0.8, // 80-100% confidence
        tokensUsed: 350
      },
      {
        id: '2',
        subject: this.generateSubject(lead, productDetails, emailType, tone, true),
        body: this.generateEmailBody(lead, productDetails, emailType, tone, personalizationLevel, true),
        tone,
        personalization: this.getPersonalizationFactors(lead, personalizationLevel),
        confidence: Math.random() * 0.2 + 0.7, // 70-90% confidence
        tokensUsed: 420
      },
      {
        id: '3',
        subject: this.generateSubject(lead, productDetails, emailType, tone, false),
        body: this.generateEmailBody(lead, productDetails, emailType, tone, personalizationLevel, false),
        tone,
        personalization: this.getPersonalizationFactors(lead, personalizationLevel),
        confidence: Math.random() * 0.2 + 0.75, // 75-95% confidence
        tokensUsed: 380
      }
    ];

    return this.simulateAPI({ emails: mockEmails });
  }

  /**
   * Score leads using AI algorithms
   */
  async scoreLeads(request: LeadScoringRequest): Promise<AIResponse<LeadScoringResponse>> {
    const mockResponse: LeadScoringResponse = {
      scores: request.leads.map(lead => {
        const baseScore = this.calculateBaseScore(lead);
        const engagementBoost = lead.engagement * 0.2;
        const finalScore = Math.min(100, baseScore + engagementBoost);

        return {
          leadId: lead.id,
          score: Math.round(finalScore),
          factors: [
            { factor: 'Company Size', weight: 0.3, reason: `Mid-sized company (${lead.companySize})` },
            { factor: 'Industry Fit', weight: 0.25, reason: 'High relevance to target market' },
            { factor: 'Title Authority', weight: 0.2, reason: 'Decision-making position' },
            { factor: 'Engagement Level', weight: 0.15, reason: 'Recent activity detected' },
            { factor: 'Location', weight: 0.1, reason: 'Target market region' }
          ],
          recommendations: this.generateRecommendations(finalScore)
        };
      })
    };

    return this.simulateAPI(mockResponse);
  }

  /**
   * Generate follow-up sequences using AI
   */
  async generateSequence(request: SequenceGenerationRequest): Promise<AIResponse<SequenceGenerationResponse>> {
    const mockSequence: SequenceGenerationResponse = {
      sequence: {
        id: `seq_${Date.now()}`,
        name: `${request.sequenceType} Sequence - ${request.targetAudience}`,
        steps: Array.from({ length: request.steps }, (_, i) => ({
          step: i + 1,
          type: i % 3 === 0 ? 'email' : i % 3 === 1 ? 'call' : 'task',
          content: this.generateStepContent(i, request.sequenceType),
          timing: `${i === 0 ? 'Immediate' : `${i * 2} days`}`
        })),
        estimatedCompletion: `${(request.steps * 2) + 1} days`,
        successRate: Math.random() * 0.3 + 0.6 // 60-90% success rate
      }
    };

    return this.simulateAPI(mockSequence, 1500);
  }

  // Helper methods for generating mock data
  private generateName(email: string): string {
    const names = [
      'Sarah Johnson', 'Mike Chen', 'Alex Rodriguez', 'Jessica Williams',
      'David Kim', 'Emily Brown', 'Chris Thompson', 'Amanda Davis'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  private generateTitle(): string {
    const titles = [
      'CEO', 'CTO', 'VP of Sales', 'Marketing Director',
      'Product Manager', 'Business Development', 'Operations Manager'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private generateCompany(): string {
    const companies = [
      'TechCorp Inc', 'StartupIO', 'InnovateLabs', 'Digital Solutions',
      'CloudSystems', 'DataDriven Inc', 'FutureTech', 'SmartEnterprise'
    ];
    return companies[Math.floor(Math.random() * companies.length)];
  }

  private generateCompanySize(): string {
    const sizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }

  private generateIndustry(): string {
    const industries = [
      'Technology', 'SaaS', 'Healthcare', 'Finance',
      'E-commerce', 'Manufacturing', 'Education', 'Consulting'
    ];
    return industries[Math.floor(Math.random() * industries.length)];
  }

  private generateLocation(): string {
    const locations = [
      'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Boston, MA',
      'Seattle, WA', 'Chicago, IL', 'Denver, CO', 'Atlanta, GA'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  private generatePhone(): string {
    return `+1-555-${Math.random().toString().slice(2, 6)}`;
  }

  private generateSubject(lead: any, product: string, type: string, tone: string, alternative = false): string {
    const baseSubjects = {
      'cold-outreach': [
        `Quick question about ${product.split(' ')[0]} at ${lead.company}`,
        `Opportunity: ${product} - ${lead.company}`,
        `${product} for ${lead.company}`
      ],
      'follow-up': [
        `Following up on ${product}`,
        `Re: ${product} discussion`,
        `Continuing our conversation about ${product}`
      ]
    };

    const subjects = baseSubjects[type as keyof typeof baseSubjects] || baseSubjects['cold-outreach'];
    return alternative ? subjects[1] : subjects[0];
  }

  private generateEmailBody(lead: any, product: string, type: string, tone: string, personalization: string, alternative = false): string {
    const templates = {
      professional: `Hi ${lead.name},

I noticed your role as ${lead.title} at ${lead.company} and thought you might be interested in our ${product}.

We've helped similar companies in the ${lead.industry} industry achieve significant results. Would you be open to a quick 15-minute chat next week?

Best regards,
Demo User`,

      friendly: `Hello ${lead.name},

I'm reaching out because our ${product} seems like a perfect fit for ${lead.company}, especially given your focus on ${lead.industry}.

We specialize in helping ${lead.companySize} companies like yours streamline their operations. Are you available for a brief call to discuss potential synergies?

Looking forward to connecting!
Demo User`
    };

    return templates[tone as keyof typeof templates] || templates.professional;
  }

  private getPersonalizationFactors(lead: any, level: string): string[] {
    const factors = ['name', 'company', 'title', 'industry', 'companySize'];
    const levelMap = {
      minimal: 2,
      moderate: 3,
      high: 5
    };
    
    return factors.slice(0, levelMap[level as keyof typeof levelMap]);
  }

  private calculateBaseScore(lead: any): number {
    let score = 50;
    
    // Company size scoring
    if (lead.companySize === '501-1000' || lead.companySize === '1000+') score += 15;
    else if (lead.companySize === '201-500') score += 10;
    else if (lead.companySize === '51-200') score += 5;

    // Industry scoring
    const highValueIndustries = ['Technology', 'SaaS', 'Finance'];
    if (highValueIndustries.includes(lead.industry)) score += 10;

    // Title scoring
    const decisionMakerTitles = ['CEO', 'CTO', 'VP of Sales', 'Marketing Director'];
    if (decisionMakerTitles.includes(lead.title)) score += 15;

    return score;
  }

  private generateRecommendations(score: number): string[] {
    if (score >= 80) {
      return ['Contact immediately', 'Personalized outreach', 'Schedule demo'];
    } else if (score >= 60) {
      return ['Warm outreach', 'Educational content', 'Follow up in 3 days'];
    } else {
      return ['Nurture campaign', 'Newsletter subscription', 'Re-evaluate in 2 weeks'];
    }
  }

  private generateStepContent(step: number, sequenceType: string): any {
    const steps = {
      email: {
        subject: `Step ${step + 1}: Follow up on ${sequenceType}`,
        body: `This is the email content for step ${step + 1} of the ${sequenceType} sequence.`
      },
      call: {
        script: `Call script for step ${step + 1}: Discuss ${sequenceType} benefits and next steps.`,
        objective: 'Schedule next meeting or get commitment'
      },
      task: {
        action: `Research ${sequenceType} related topics`,
        notes: 'Prepare for next interaction'
      }
    };

    const stepTypes = ['email', 'call', 'task'];
    const type = stepTypes[step % stepTypes.length];
    return steps[type as keyof typeof steps];
  }
}

// Export singleton instance
export const apiService = new MockAPIService();

/**
 * REAL API SERVICE TEMPLATE - For when you upgrade
 * 
 * Uncomment and replace the MockAPIService when you have API keys
 * 
 * class RealAPIService {
 *   private baseURL = 'https://api.your-ai-service.com/v1';
 *   private apiKey = process.env.AI_API_KEY;
 * 
 *   async makeRequest<T>(endpoint: string, data: any): Promise<AIResponse<T>> {
 *     try {
 *       const response = await fetch(`${this.baseURL}${endpoint}`, {
 *         method: 'POST',
 *         headers: {
 *           'Content-Type': 'application/json',
 *           'Authorization': `Bearer ${this.apiKey}`
 *         },
 *         body: JSON.stringify(data)
 *       });
 * 
 *       if (!response.ok) throw new Error(`API Error: ${response.status}`);
 *       
 *       const result = await response.json();
 *       return { success: true, data: result };
 *     } catch (error) {
 *       return { success: false, error: error.message };
 *     }
 *   }
 * 
 *   // Implement real API methods here...
 * }
 */