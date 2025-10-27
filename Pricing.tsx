/**
 * Pricing page with active trial buttons and CashApp integration
 * Displays all pricing tiers with direct links to business CashApp
 */
import React from 'react';
import { Button } from '../components/ui/button';
import { Zap, Check, Star, Crown, Shield } from 'lucide-react';

/**
 * Pricing tier interface
 */
interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  cashappAmount?: string;
}

/**
 * Pricing page component with CashApp integration
 */
export function Pricing() {
  const pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$49',
      description: 'Perfect for individual sales professionals',
      features: [
        '100 leads per month',
        'Basic email templates',
        'Lead scoring',
        'Email support',
        'CRM integration'
      ],
      icon: <Zap className="w-6 h-6" />,
      cashappAmount: '49.00'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$99',
      description: 'Ideal for growing sales teams',
      features: [
        '500 leads per month',
        'Advanced email templates',
        'AI-powered lead scoring',
        'Priority email support',
        'CRM & calendar integration',
        'Custom sequences',
        'Team collaboration'
      ],
      popular: true,
      icon: <Crown className="w-6 h-6" />,
      cashappAmount: '99.00'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$199',
      description: 'For large organizations and agencies',
      features: [
        'Unlimited leads',
        'Custom AI models',
        'Dedicated account manager',
        'Phone & email support',
        'Advanced analytics',
        'API access',
        'Custom integrations',
        'White-label options'
      ],
      icon: <Shield className="w-6 h-6" />,
      cashappAmount: '199.00'
    }
  ];

  /**
   * Handle CashApp payment for a specific tier
   */
  const handleCashAppPayment = (tier: PricingTier) => {
    const cashappUrl = `https://cash.app/$${tier.cashappAmount ? `edcmediadesigns/${tier.cashappAmount}` : 'edcmediadesigns'}`;
    window.open(cashappUrl, '_blank', 'noopener,noreferrer');
  };

  /**
   * Handle free trial start
   */
  const handleStartFreeTrial = () => {
    // Redirect to CashApp for the starter plan
    const cashappUrl = 'https://cash.app/$edcmediadesigns';
    window.open(cashappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Choose Your Plan
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Start with a 14-day free trial. No credit card required. All plans include full access to our AI sales tools.
        </p>
      </div>

      {/* Free Trial Banner */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">14-Day Free Trial</h3>
              <p className="text-cyan-400 text-sm">Get full access to all Professional features</p>
            </div>
          </div>
          <Button
            onClick={handleStartFreeTrial}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 px-8 py-3"
          >
            <Zap className="w-4 h-4 mr-2" />
            Start Free Trial
          </Button>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
              tier.popular
                ? 'border-cyan-500/50 bg-gray-800/50 shadow-2xl shadow-cyan-500/20'
                : 'border-gray-700 bg-gray-800/30'
            }`}
          >
            {/* Popular Badge */}
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="p-6">
              {/* Tier Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  tier.popular 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'bg-gray-700/50 text-gray-400'
                }`}>
                  {tier.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">{tier.name}</h3>
                  <p className="text-gray-400 text-sm">{tier.description}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CashApp Button */}
              <Button
                onClick={() => handleCashAppPayment(tier)}
                className={`w-full py-3 text-base font-medium transition-all duration-200 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0'
                    : 'bg-transparent border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                {tier.popular ? (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    Get {tier.name}
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Choose {tier.name}
                  </>
                )}
              </Button>

              {/* CashApp Note */}
              <p className="text-center text-gray-400 text-xs mt-3">
                Pay with CashApp: <span className="text-cyan-400 font-mono">$edcmediadesigns</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-800/30 rounded-2xl border border-gray-700 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-semibold mb-2">How does the free trial work?</h4>
            <p className="text-gray-400 text-sm">
              Start with a 14-day free trial of our Professional plan. No payment required upfront. 
              After the trial, choose any plan that fits your needs.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">What payment methods do you accept?</h4>
            <p className="text-gray-400 text-sm">
              We primarily accept CashApp payments to <span className="text-cyan-400 font-mono">$edcmediadesigns</span>. 
              All payments are secure and processed instantly.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Can I change plans later?</h4>
            <p className="text-gray-400 text-sm">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Is there a setup fee?</h4>
            <p className="text-gray-400 text-sm">
              No setup fees for any plan. You only pay the monthly subscription fee for the plan you choose.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="text-center mt-8">
        <p className="text-gray-400">
          Need help choosing?{' '}
          <button className="text-cyan-400 hover:text-cyan-300 underline">
            Contact our sales team
          </button>
        </p>
      </div>
    </div>
  );
}