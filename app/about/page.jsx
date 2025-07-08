import React from 'react'
import { Brain, Target, Users, Award, CheckCircle, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function About() {
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
              <Brain className="h-4 w-4 mr-2" />
              About AI MockPrep
            </div>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>
              Revolutionizing Interview
              <span className='bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'> Preparation</span>
            </h1>
            <p className='text-xl text-blue-100 max-w-3xl mx-auto'>
              We're on a mission to help job seekers build confidence, improve their skills, and land their dream jobs through AI-powered mock interviews.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-6 py-16'>
        
        {/* Our Story Section */}
        <div className='mb-20'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-6'>Our Story</h2>
              <div className='prose prose-lg text-gray-600 space-y-4'>
                <p>
                  AI MockPrep was developed as an innovative solution to help job seekers practice and improve their interview skills using artificial intelligence. This project combines modern web technologies with AI to create personalized interview experiences.
                </p>
                <p>
                  The platform leverages cutting-edge AI technology to generate realistic interview questions tailored to specific job roles and provides intelligent feedback to help users improve their performance.
                </p>
                <p>
                  Built with a focus on accessibility and user experience, AI MockPrep aims to democratize interview preparation and help job seekers build confidence for their most important career moments.
                </p>
              </div>
            </div>
            <div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
              <div className='text-center'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>Developer</h3>
                <div className='space-y-3'>
                  <div className='text-lg font-semibold text-blue-600'>Piyush Goyal</div>
                  <div className='text-gray-600'>Punjab Engineering College, Chandigarh</div>
                  <div className='text-sm text-gray-500 mt-4 p-4 bg-gray-50 rounded-lg'>
                    Passionate about leveraging AI technology to solve real-world problems and help job seekers succeed in their career journey.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className='mb-20'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-blue-50 rounded-2xl p-8 border border-blue-100'>
              <div className='flex items-center mb-6'>
                <div className='p-3 bg-blue-600 rounded-xl'>
                  <Target className='h-6 w-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-blue-900 ml-4'>Our Mission</h3>
              </div>                <p className='text-blue-800 leading-relaxed'>
                  To democratize interview preparation by providing AI-powered, personalized mock interviews that help job seekers build confidence, improve their skills, and achieve their career goals through accessible technology.
                </p>
            </div>
            
            <div className='bg-purple-50 rounded-2xl p-8 border border-purple-100'>
              <div className='flex items-center mb-6'>
                <div className='p-3 bg-purple-600 rounded-xl'>
                  <Star className='h-6 w-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-purple-900 ml-4'>Our Vision</h3>
              </div>                <p className='text-purple-800 leading-relaxed'>
                  To become a leading platform for AI-powered interview preparation, where technology meets personalized learning to help job seekers excel in their career pursuits.
                </p>
            </div>
          </div>
        </div>     

        {/* CTA Section */}
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white'>
          <h2 className='text-3xl font-bold mb-4'>Ready to Transform Your Interview Skills?</h2>
          <p className='text-blue-100 mb-8 max-w-2xl mx-auto'>
            Join the journey of improving interview preparation through innovative AI technology.
          </p>
          <Link href="/dashboard" className='inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors'>
            Get Started Today
            <ArrowRight className='ml-2 h-5 w-5' />
          </Link>
        </div>
      </div>
    </div>
  )
}
