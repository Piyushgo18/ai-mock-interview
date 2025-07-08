// utils/razorpay.js
import Razorpay from 'razorpay';

// Initialize Razorpay instance (server-side only)
export const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Client-side Razorpay configuration
export const razorpayConfig = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  currency: 'INR',
  name: 'AI MockPrep',
  description: 'Pro Plan Subscription',
  theme: {
    color: '#3B82F6',
  },
};

// Load Razorpay script dynamically
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Format amount for Razorpay (convert to paise)
export const formatAmountForRazorpay = (amount) => {
  return Math.round(amount * 100);
};

// Pro plan details
export const PRO_PLAN = {
  name: 'Pro Plan',
  price: 7.99, // USD
  priceINR: 649, // Approximate INR equivalent
  duration: 'monthly',
  features: [
    'Everything in Free plan',
    'Priority customer support',
    'Advanced AI feedback analysis',
    'Detailed performance insights',
    'Export interview summaries',
    'Custom question suggestions',
    'Enhanced user interface',
    'Regular feature updates'
  ]
};
