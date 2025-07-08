"use client"
import React, { useState } from 'react'
import { Brain, Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Bug, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission (you can replace this with actual API call)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast.success('Message sent successfully! We\'ll get back to you soon.', {
        duration: 3000,
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });

      // Redirect to dashboard after a brief delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
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
              <MessageCircle className="h-4 w-4 mr-2" />
              Get In Touch
            </div>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>
              Contact
              <span className='bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'> Us</span>
            </h1>
            <p className='text-xl text-blue-100 max-w-3xl mx-auto'>
              Have questions about AI MockPrep? Need support? Want to share feedback? We'd love to hear from you!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-6 py-16'>
        
        {/* Contact Methods */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20'>
          
          {/* Contact Form */}
          <div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>First Name</label>
                  <input 
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                    placeholder='Your first name'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Last Name</label>
                  <input 
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                    placeholder='Your last name'
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                <input 
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                  placeholder='your.email@example.com'
                  required
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Subject</label>
                <select 
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                >
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Message</label>
                <textarea 
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                  placeholder='Tell us how we can help you...'
                  required
                ></textarea>
              </div>
              
              <button 
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <Send className='h-5 w-5 mr-2' />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className='space-y-8'>
            
            {/* Contact Cards */}
            <div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
              <h3 className='text-xl font-bold text-gray-900 mb-6'>Get in Touch</h3>
              
              <div className='space-y-6'>
                <div className='flex items-start'>
                  <div className='p-3 bg-blue-100 rounded-lg mr-4'>
                    <Mail className='h-6 w-6 text-blue-600' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>Email Support</h4>
                    <p className='text-gray-600 text-sm mb-1'>Get help from our support team</p>
                    <a href='mailto:support@aimockprep.com' className='text-blue-600 hover:text-blue-700'>
                      support@aimockprep.com
                    </a>
                  </div>
                </div>
                
                <div className='flex items-start'>
                  <div className='p-3 bg-green-100 rounded-lg mr-4'>
                    <MessageCircle className='h-6 w-6 text-green-600' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>Live Chat</h4>
                    <p className='text-gray-600 text-sm mb-1'>Chat with us in real-time</p>
                    <button className='text-green-600 hover:text-green-700'>Start Live Chat</button>
                  </div>
                </div>
                
                <div className='flex items-start'>
                  <div className='p-3 bg-purple-100 rounded-lg mr-4'>
                    <Clock className='h-6 w-6 text-purple-600' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>Response Time</h4>
                    <p className='text-gray-600 text-sm'>We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
              <h3 className='text-xl font-bold text-gray-900 mb-6'>Quick Help</h3>
              
              <div className='space-y-4'>
                <div className='border-l-4 border-blue-500 pl-4'>
                  <h4 className='font-semibold text-gray-900 text-sm'>How do I start my first interview?</h4>
                  <p className='text-gray-600 text-xs mt-1'>
                    Click "Create New Interview" on your dashboard and fill in your job details.
                  </p>
                </div>
                
                <div className='border-l-4 border-green-500 pl-4'>
                  <h4 className='font-semibold text-gray-900 text-sm'>Can I practice multiple times?</h4>
                  <p className='text-gray-600 text-xs mt-1'>
                    Yes! You can create unlimited mock interviews and practice as much as you want.
                  </p>
                </div>
                
                <div className='border-l-4 border-purple-500 pl-4'>
                  <h4 className='font-semibold text-gray-900 text-sm'>Is my data secure?</h4>
                  <p className='text-gray-600 text-xs mt-1'>
                    Absolutely. We use enterprise-grade security to protect your information.
                  </p>
                </div>
              </div>
              
              <Link 
                href="/faq" 
                className='inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium mt-4'
              >
                <HelpCircle className='h-4 w-4 mr-1' />
                View All FAQs
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Types */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>How Can We Help?</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Choose the best way to reach us based on your needs
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow'>
              <div className='inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4'>
                <HelpCircle className='h-6 w-6 text-blue-600' />
              </div>
              <h4 className='text-lg font-semibold text-gray-900 mb-2'>General Support</h4>
              <p className='text-gray-600 text-sm mb-4'>Questions about how to use AI MockPrep</p>
              <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>Get Help</button>
            </div>
            
            <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow'>
              <div className='inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-4'>
                <Bug className='h-6 w-6 text-red-600' />
              </div>
              <h4 className='text-lg font-semibold text-gray-900 mb-2'>Bug Reports</h4>
              <p className='text-gray-600 text-sm mb-4'>Found a technical issue? Let us know</p>
              <button className='text-red-600 hover:text-red-700 text-sm font-medium'>Report Bug</button>
            </div>
            
            <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow'>
              <div className='inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4'>
                <Lightbulb className='h-6 w-6 text-green-600' />
              </div>
              <h4 className='text-lg font-semibold text-gray-900 mb-2'>Feature Requests</h4>
              <p className='text-gray-600 text-sm mb-4'>Have an idea to make us better?</p>
              <button className='text-green-600 hover:text-green-700 text-sm font-medium'>Share Idea</button>
            </div>
            
            <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow'>
              <div className='inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4'>
                <Brain className='h-6 w-6 text-purple-600' />
              </div>
              <h4 className='text-lg font-semibold text-gray-900 mb-2'>Partnerships</h4>
              <p className='text-gray-600 text-sm mb-4'>Interested in partnering with us?</p>
              <button className='text-purple-600 hover:text-purple-700 text-sm font-medium'>Let's Talk</button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}
