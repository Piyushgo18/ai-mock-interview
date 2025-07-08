"use client"
import React, { useState, useEffect } from 'react'
import { Brain, Check, Star, Zap, Target, Users, Award, Crown, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { loadRazorpayScript, PRO_PLAN } from '../../utils/razorpay'

export default function Upgrade() {
  const router = useRouter();
  const { user } = useUser();
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleBasicPlan = () => {
    toast.success('You have chosen the Basic plan! Redirecting to dashboard...', {
      duration: 3000,
    });
    
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleProPlanPayment = async () => {
    if (!user) {
      toast.error('Please sign in to upgrade your plan');
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      
      if (!isScriptLoaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        setIsProcessingPayment(false);
        return;
      }

      // Create order
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: PRO_PLAN.priceINR,
          currency: 'INR'
        }),
      });

      const orderData = await response.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'AI MockPrep',
        description: 'Pro Plan Subscription - Monthly',
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user.id
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              toast.success('🎉 Payment successful! Welcome to Pro plan!', {
                duration: 4000,
              });
              
              setTimeout(() => {
                router.push('/dashboard');
              }, 2000);
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user.fullName || user.firstName || '',
          email: user.emailAddresses[0]?.emailAddress || '',
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: function() {
            setIsProcessingPayment(false);
            toast.info('Payment cancelled');
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  const handleUpgrade = (planType, planId) => {
    if (planId === 'Basic') {
      handleBasicPlan();
    } else if (planId === 'pro') {
      handleProPlanPayment();
    }
  };

  const plans = [
    {
      id: 'Basic',
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started with AI mock interviews',
      features: [
        'Create unlimited mock interviews',
        'AI-powered question generation',
        'Basic feedback and ratings',
        'Standard interview experience',
        'Access to all job categories'
      ],
      buttonText: 'Current Plan',
      buttonClass: 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '₹649',
      period: '/month',
      description: 'Enhanced features for serious interview preparation',
      features: [
        'Everything in Free plan',
        'Priority customer support',
        'Advanced AI feedback analysis',
        'Detailed performance insights',
        'Export interview summaries',
        'Custom question suggestions',
        'Enhanced user interface',
        'Regular feature updates'
      ],
      buttonText: 'Upgrade to Pro',
      buttonClass: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700',
      popular: true
    }
  ];

  return (
    <div className='min-h-screen bg-gray-50 relative'>
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden'>
        <div className='absolute inset-0 bg-black opacity-10'></div>
        <div className='relative px-6 py-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6'>
              <Crown className="h-4 w-4 mr-2" />
              Upgrade Your Experience
            </div>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>
              Unlock Your
              <span className='bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'> Potential</span>
            </h1>
            <p className='text-xl text-blue-100 max-w-3xl mx-auto'>
              Take your interview preparation to the next level with advanced AI features, unlimited practice sessions, and detailed analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-16'>
        
        {/* Pricing Plans */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Choose Your Plan</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Select the perfect plan for your interview preparation needs. Upgrade anytime as your requirements grow.
            </p>
          </div>
          
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-blue-500 relative transform scale-105' 
                    : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center'>
                      <Sparkles className='h-4 w-4 mr-1' />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className='p-8'>
                  <div className='text-center mb-8'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-2'>{plan.name}</h3>
                    <div className='mb-4'>
                      <span className='text-4xl font-bold text-gray-900'>{plan.price}</span>
                      {plan.period && <span className='text-gray-600'>{plan.period}</span>}
                    </div>
                    <p className='text-gray-600'>{plan.description}</p>
                  </div>
                  
                  <ul className='space-y-4 mb-8'>
                    {plan.features.map((feature, index) => (
                      <li key={index} className='flex items-start'>
                        <Check className='h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                        <span className='text-gray-700'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handleUpgrade(plan.name, plan.id)}
                    disabled={isProcessingPayment}
                    className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isProcessingPayment && plan.id === 'pro' 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : plan.buttonClass
                    }`}
                  >
                    {isProcessingPayment && plan.id === 'pro' ? 'Processing...' : plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Why Upgrade?</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Discover the powerful features that make AI MockPrep the ultimate interview preparation platform.
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center'>
              <div className='inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4'>
                <Brain className='h-6 w-6 text-blue-600' />
              </div>
              <h4 className='text-lg font-semibold text-gray-900 mb-2'>Enhanced AI</h4>
              <p className='text-gray-600 text-sm'>Get more detailed and comprehensive AI feedback on your responses.</p>
            </div>
            
            <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center'>
              <div className='inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4'>
                <Award className='h-6 w-6 text-purple-600' />
              </div>
              <h4 className='text-lg font-semibold text-gray-900 mb-2'>Priority Support</h4>
              <p className='text-gray-600 text-sm'>Get faster response times and dedicated customer support.</p>
            </div>
            
            <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center'>
              <div className='inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4'>
                <Target className='h-6 w-6 text-green-600' />
              </div>
              <h4 className='text-lg font-semibold text-gray-900 mb-2'>Better Insights</h4>
              <p className='text-gray-600 text-sm'>Access detailed performance insights and progress tracking.</p>
            </div>
            
            <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center'>
              <div className='inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mb-4'>
                <Sparkles className='h-6 w-6 text-orange-600' />
              </div>
              <h4 className='text-lg font-semibold text-gray-900 mb-2'>Premium Features</h4>
              <p className='text-gray-600 text-sm'>Enjoy enhanced UI, export options, and regular updates.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Frequently Asked Questions</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Have questions about upgrading? Here are some common questions and answers.
            </p>
          </div>
          
          <div className='max-w-4xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
                <h4 className='font-semibold text-gray-900 mb-3'>What's included in the Free plan?</h4>
                <p className='text-gray-600 text-sm'>The Free plan includes unlimited mock interviews, AI question generation, basic feedback, and access to all job categories.</p>
              </div>
              
              <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
                <h4 className='font-semibold text-gray-900 mb-3'>What additional features do I get with Pro?</h4>
                <p className='text-gray-600 text-sm'>Pro includes enhanced AI feedback, priority support, detailed insights, export options, and an improved user experience.</p>
              </div>
              
              <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
                <h4 className='font-semibold text-gray-900 mb-3'>Can I cancel my Pro subscription anytime?</h4>
                <p className='text-gray-600 text-sm'>Yes, you can cancel your Pro subscription at any time. You'll continue to have access to Pro features until the end of your billing period.</p>
              </div>
              
              <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
                <h4 className='font-semibold text-gray-900 mb-3'>How do I upgrade or downgrade?</h4>
                <p className='text-gray-600 text-sm'>You can upgrade to Pro anytime from this page. To downgrade, contact our support team and we'll help you with the process.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white'>
          <h2 className='text-3xl font-bold mb-4'>Ready to Accelerate Your Career?</h2>
          <p className='text-blue-100 mb-8 max-w-2xl mx-auto'>
            Join the ranks of successful professionals who have upgraded their interview skills with AI MockPrep Pro.
          </p>
          <button 
            onClick={() => handleProPlanPayment()}
            disabled={isProcessingPayment}
            className={`inline-flex items-center px-8 py-3 rounded-lg font-semibold transition-colors ${
              isProcessingPayment 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-white text-blue-600 hover:bg-gray-50'
            }`}
          >
            {isProcessingPayment ? 'Processing...' : 'Upgrade to Pro Now'}
            {!isProcessingPayment && <ArrowRight className='ml-2 h-5 w-5' />}
          </button>
        </div>
      </div>
    </div>
  )
}
