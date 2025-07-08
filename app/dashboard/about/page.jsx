"use client"
import React from 'react'
import { 
  Target, 
  Users, 
  Award, 
  Zap, 
  Brain, 
  Lightbulb,
  Heart,
  Globe
} from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Interviews",
      description: "Advanced AI technology that provides realistic interview scenarios and personalized feedback."
    },
    {
      icon: Target,
      title: "Targeted Practice",
      description: "Practice with questions tailored to your specific role and experience level."
    },
    {
      icon: Award,
      title: "Performance Analytics",
      description: "Detailed insights into your performance with actionable improvement suggestions."
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Get immediate feedback on your responses to accelerate your learning."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Mock Interviews Conducted" },
    { number: "85%", label: "Success Rate Improvement" },
    { number: "500+", label: "Companies Covered" },
    { number: "50+", label: "Job Roles Supported" }
  ]

  const team = [
    {
      name: "AI Interview Engine",
      role: "Core Technology",
      description: "Powered by advanced language models for realistic conversations"
    },
    {
      name: "Expert Question Bank",
      role: "Content Curation",
      description: "Questions curated by industry professionals and hiring managers"
    },
    {
      name: "Analytics Engine",
      role: "Performance Insights",
      description: "Data-driven insights to help you improve your interview skills"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">About AI Mock Interview</h1>
          <p className="text-gray-600 mt-2">Empowering job seekers with AI-driven interview preparation</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe everyone deserves the opportunity to succeed in their career. Our AI-powered mock interview platform 
            helps job seekers build confidence, improve their skills, and land their dream jobs through realistic 
            practice sessions and personalized feedback.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">What Makes Us Different</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Technology</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <Globe className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            To democratize interview preparation and make high-quality career coaching accessible to everyone, 
            regardless of their background or location. We envision a world where every job seeker can 
            confidently showcase their skills and land their ideal position.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Have Questions?</h3>
          <p className="text-gray-600 mb-6">We'd love to hear from you and help you succeed in your career journey.</p>
          <div className="space-x-4">
            <a 
              href="/dashboard/contact" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
            <a 
              href="/dashboard/help" 
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
