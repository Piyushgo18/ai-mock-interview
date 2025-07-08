"use client"
import React, { useState } from 'react'
import { 
  Crown, 
  Check, 
  X, 
  Star, 
  Zap, 
  BarChart3, 
  BookOpen, 
  Shield, 
  Headphones,
  Award,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'

const Upgrade = () => {
  const [billingCycle, setBillingCycle] = useState('monthly') // 'monthly' | 'yearly'
  const { user } = useUser()
  
  // Check if user is already Pro
  const isPro = user?.publicMetadata?.subscription === 'pro'

  const plans = {
    free: {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started",
      features: [
        "5 mock interviews per month",
        "Basic question bank (50+ questions)",
        "Standard feedback",
        "Basic performance tracking",
        "Email support"
      ],
      limitations: [
        "Limited interview attempts",
        "No advanced analytics",
        "No priority support",
        "No exclusive content"
      ]
    },
    pro: {
      name: "Pro",
      price: { monthly: 19, yearly: 190 }, // $190/year = ~$15.83/month
      description: "Everything you need to ace your interviews",
      features: [
        "Unlimited mock interviews",
        "Complete question bank (1000+ questions)",
        "Advanced AI feedback & suggestions",
        "Detailed performance analytics",
        "Skill breakdown & improvement tracking",
        "Industry-specific interview guides",
        "Priority email & chat support",
        "Export interview history",
        "Custom interview scenarios",
        "Monthly career coaching tips"
      ],
      popular: true
    }
  }

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      avatar: "SC",
      quote: "The Pro analytics helped me identify my weak areas and improve my technical interview performance. Landed my dream job!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager at Microsoft",
      avatar: "MR",
      quote: "The unlimited practice sessions and detailed feedback were game-changers for my interview preparation.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Data Scientist at Amazon",
      avatar: "EJ",
      quote: "The industry-specific guides and advanced analytics are worth every penny. Highly recommend Pro!",
      rating: 5
    }
  ]

  const handleUpgrade = async (planType) => {
    if (planType === 'free') return
    
    // Here you would integrate with your payment processor (Stripe, etc.)

    
    // For demo purposes, we'll just show an alert
    alert(`Upgrading to ${planType} plan (${billingCycle} billing). This would redirect to payment processor.`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Crown className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Upgrade to Pro</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Unlock advanced features and accelerate your interview success with unlimited practice and detailed analytics
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-lg border border-gray-200">
            <div className="flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors relative ${
                  billingCycle === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Free Plan */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plans.free.name}</h3>
              <p className="text-gray-600 mb-4">{plans.free.description}</p>
              <div className="text-4xl font-bold text-gray-900">
                $0<span className="text-lg text-gray-600 font-normal">/month</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {plans.free.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
              {plans.free.limitations.map((limitation, index) => (
                <div key={index} className="flex items-center opacity-60">
                  <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-500 line-through">{limitation}</span>
                </div>
              ))}
            </div>

            <Button 
              className="w-full bg-gray-600 hover:bg-gray-700"
              disabled={!isPro}
            >
              {isPro ? 'Current Plan' : 'Get Started Free'}
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-xl shadow-xl border-2 border-blue-500 p-8 relative">
            {plans.pro.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                <Crown className="w-6 h-6 text-yellow-500 mr-2" />
                {plans.pro.name}
              </h3>
              <p className="text-gray-600 mb-4">{plans.pro.description}</p>
              <div className="text-4xl font-bold text-gray-900">
                ${plans.pro.price[billingCycle]}
                <span className="text-lg text-gray-600 font-normal">
                  /{billingCycle === 'yearly' ? 'year' : 'month'}
                </span>
              </div>
              {billingCycle === 'yearly' && (
                <p className="text-green-600 text-sm mt-1">Save $38 per year!</p>
              )}
            </div>

            <div className="space-y-4 mb-8">
              {plans.pro.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => handleUpgrade('pro')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              disabled={isPro}
            >
              {isPro ? (
                <>
                  <Crown className="w-4 h-4 mr-2" />
                  Current Plan
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-4 font-semibold text-gray-900">
                    <div className="flex items-center justify-center">
                      <Crown className="w-5 h-5 text-yellow-500 mr-1" />
                      Pro
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 text-gray-700">Mock Interviews</td>
                  <td className="text-center py-4">5/month</td>
                  <td className="text-center py-4 text-green-600 font-semibold">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 text-gray-700">Question Bank</td>
                  <td className="text-center py-4">50+ questions</td>
                  <td className="text-center py-4 text-green-600 font-semibold">1000+ questions</td>
                </tr>
                <tr>
                  <td className="py-4 text-gray-700">Performance Analytics</td>
                  <td className="text-center py-4">Basic</td>
                  <td className="text-center py-4 text-green-600 font-semibold">Advanced</td>
                </tr>
                <tr>
                  <td className="py-4 text-gray-700">AI Feedback</td>
                  <td className="text-center py-4">Standard</td>
                  <td className="text-center py-4 text-green-600 font-semibold">Detailed</td>
                </tr>
                <tr>
                  <td className="py-4 text-gray-700">Support</td>
                  <td className="text-center py-4">Email</td>
                  <td className="text-center py-4 text-green-600 font-semibold">Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">What Our Pro Users Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600 text-sm mb-4">Yes, you can cancel your Pro subscription at any time. You'll continue to have access until the end of your billing period.</p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm">Yes! You get 5 free mock interviews every month to try our platform before upgrading.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 text-sm mb-4">We accept all major credit cards, PayPal, and bank transfers for yearly subscriptions.</p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600 text-sm">We offer a 30-day money-back guarantee if you're not satisfied with Pro features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upgrade
