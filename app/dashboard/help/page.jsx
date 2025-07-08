"use client"
import React, { useState } from 'react'
import { 
  Search, 
  HelpCircle, 
  Book, 
  Video, 
  MessageCircle, 
  ChevronRight,
  ChevronDown,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  X
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Topics', icon: Book },
    { id: 'getting-started', name: 'Getting Started', icon: Star },
    { id: 'interviews', name: 'Mock Interviews', icon: Video },
    { id: 'analytics', name: 'Analytics & Reports', icon: ChevronRight },
    { id: 'billing', name: 'Billing & Subscription', icon: HelpCircle },
    { id: 'technical', name: 'Technical Issues', icon: AlertTriangle },
    { id: 'account', name: 'Account Management', icon: CheckCircle }
  ]

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: "How do I start my first mock interview?",
      answer: "To start your first mock interview: 1) Go to your dashboard and click 'Add New Interview', 2) Select your job position and experience level, 3) Choose the number of questions, 4) Click 'Start Interview' and begin practicing. The AI will ask you questions one by one and provide feedback after each response.",
      helpful: 24,
      views: 156
    },
    {
      id: 2,
      category: 'interviews',
      question: "Can I pause or restart an interview?",
      answer: "Yes! You can pause your interview at any time by clicking the pause button. Your progress is automatically saved. To restart completely, go to your interview history and click 'Retake Interview' on any previous session.",
      helpful: 18,
      views: 89
    },
    {
      id: 3,
      category: 'analytics',
      question: "How is my performance score calculated?",
      answer: "Your performance score is calculated based on multiple factors: 1) Content quality (relevance and depth of your answers), 2) Communication skills (clarity and structure), 3) Confidence level (based on speech patterns), 4) Technical accuracy (for technical roles). Each factor is weighted and combined to give you an overall score out of 10.",
      helpful: 31,
      views: 203
    },
    {
      id: 4,
      category: 'billing',
      question: "What's the difference between Free and Pro plans?",
      answer: "Free plan includes 5 mock interviews per month, basic question bank (50+ questions), standard feedback, and email support. Pro plan offers unlimited interviews, complete question bank (1000+ questions), advanced AI feedback, detailed analytics, priority support, and exclusive features like custom scenarios and export options.",
      helpful: 42,
      views: 298
    },
    {
      id: 5,
      category: 'technical',
      question: "My microphone isn't working during interviews",
      answer: "If your microphone isn't working: 1) Check your browser permissions - click the microphone icon in the address bar and allow access, 2) Ensure your microphone is not being used by other applications, 3) Try refreshing the page and granting permissions again, 4) Check your system's microphone settings and make sure it's not muted, 5) Try using a different browser if the issue persists.",
      helpful: 15,
      views: 67
    },
    {
      id: 6,
      category: 'account',
      question: "How do I update my profile information?",
      answer: "To update your profile: 1) Go to Settings from the sidebar, 2) Click on the 'Profile' tab, 3) Click the 'Edit' button, 4) Update your information including name, email, job title, and bio, 5) Click 'Save Changes'. Your updated information will be used to personalize your interview experience.",
      helpful: 12,
      views: 45
    },
    {
      id: 7,
      category: 'interviews',
      question: "Can I practice for specific companies?",
      answer: "Yes! Our question bank includes company-specific questions for major tech companies like Google, Amazon, Microsoft, Apple, and more. When creating a new interview, you can filter questions by company or industry to practice targeted scenarios.",
      helpful: 28,
      views: 134
    },
    {
      id: 8,
      category: 'analytics',
      question: "How can I track my improvement over time?",
      answer: "The Analytics page shows your progress through various metrics: 1) Performance trends over time, 2) Skill breakdown charts, 3) Strengths and weaknesses analysis, 4) Improvement suggestions. Pro users get additional insights like monthly progress reports and advanced analytics.",
      helpful: 19,
      views: 78
    }
  ]

  const quickLinks = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      icon: Star,
      link: "#getting-started"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: Video,
      link: "#tutorials"
    },
    {
      title: "Contact Support",
      description: "Get help from our support team",
      icon: MessageCircle,
      link: "/dashboard/contact"
    },
    {
      title: "Feature Requests",
      description: "Suggest new features and improvements",
      icon: HelpCircle,
      link: "#feedback"
    }
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Find answers to common questions and get the most out of your AI Mock Interview experience
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg bg-white text-gray-900 border-0 rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <link.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{link.title}</h3>
                <p className="text-gray-600 text-sm">{link.description}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <category.icon className="w-5 h-5 mr-3" />
                    <span className="text-sm">{category.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredFaqs.length} questions found
                </span>
              </div>

              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or browse by category.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          {expandedFaq === faq.id ? (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center mt-2 text-sm text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            {faq.helpful} helpful
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {faq.views} views
                          </span>
                        </div>
                      </button>
                      
                      {expandedFaq === faq.id && (
                        <div className="px-6 pb-6">
                          <div className="pt-4 border-t border-gray-200">
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {faq.answer}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">Was this helpful?</span>
                                <div className="flex space-x-2">
                                  <button className="text-green-600 hover:bg-green-50 p-1 rounded">
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button className="text-red-600 hover:bg-red-50 p-1 rounded">
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <span className="text-xs text-gray-400">
                                Category: {categories.find(c => c.id === faq.category)?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Still Need Help */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
              <p className="text-lg opacity-90 mb-6">
                Can't find the answer you're looking for? Our support team is here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <a href="/dashboard/contact">Contact Support</a>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white  text-blue-600 hover:bg-gray-100 hover:text-blue-600"
                >
                  
                  <a href="/dashboard/contact">Request Feature</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpCenter
