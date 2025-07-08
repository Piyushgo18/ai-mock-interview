"use client"
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
import { 
  Brain, 
  Target, 
  Trophy, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  BarChart3,
  MessageSquare,
  Shield,
  Zap
} from 'lucide-react';

// Animation hook for scroll-triggered animations
const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isInView];
};

export default function Home() {
  const [featuresRef, featuresInView] = useInView();
  const [howItWorksRef, howItWorksInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [testimonialsRef, testimonialsInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-white/80 sticky top-0 z-50 border-b border-white/20">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Brain className="h-8 w-8 text-blue-600 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI MockPrep
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group">
            How it Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group">
            Reviews
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <SignInButton mode="modal">
            <Button variant="outline" className="hidden md:flex hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-md">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Get Started
            </Button>
          </SignUpButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium animate-bounce-in">
                🚀 AI-Powered Interview Training
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Master Your
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient"> Next Interview </span>
                with AI
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Practice with our AI-powered mock interview platform. Get personalized feedback, 
                improve your skills, and land your dream job with confidence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                  Start Practicing Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2 animate-slide-in-left">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current animate-star-twinkle" style={{animationDelay: `${i * 0.1}s`}} />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 animate-slide-in-right">
                <Users className="h-5 w-5 text-green-500" />
                <span className="text-gray-600 font-medium">10,000+ Users</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in-right">
            {/* Enhanced Hero Visual */}
            <div className="relative bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-blob"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
              <div className="relative">
                <div className="flex items-center justify-center h-96">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <Brain className="h-32 w-32 text-blue-600 mx-auto animate-float" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-800">AI Interview Coach</h3>
                      <p className="text-gray-600">Ready to help you succeed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="bg-white py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-6">
              ✨ Powerful Features
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Why Choose AI MockPrep?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides everything you need to ace your next interview
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Questions",
                description: "Get realistic interview questions generated by AI based on your job role and industry",
                color: "blue",
                delay: "0"
              },
              {
                icon: MessageSquare,
                title: "Real-time Feedback",
                description: "Receive instant feedback on your answers with detailed analysis and improvement suggestions",
                color: "green",
                delay: "100"
              },
              {
                icon: BarChart3,
                title: "Performance Analytics",
                description: "Track your progress with detailed analytics and identify areas for improvement",
                color: "purple",
                delay: "200"
              },
              {
                icon: Target,
                title: "Job-specific Practice",
                description: "Practice with questions tailored to specific job roles and companies",
                color: "orange",
                delay: "300"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your practice sessions and data are completely secure and private",
                color: "indigo",
                delay: "400"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Get instant results and feedback without any delays or waiting time",
                color: "pink",
                delay: "500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: featuresInView ? `${feature.delay}ms` : '0ms' }}
              >
                <div className={`bg-${feature.color}-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" ref={howItWorksRef} className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${howItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-6">
              🎯 Simple Process
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with AI MockPrep in just a few simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Role",
                description: "Select your target job role and let our AI generate relevant questions",
                color: "blue"
              },
              {
                step: "2", 
                title: "Practice & Record",
                description: "Answer questions naturally while our AI analyzes your responses",
                color: "green"
              },
              {
                step: "3",
                title: "Get Feedback",
                description: "Receive detailed feedback and improve your performance for the real interview",
                color: "purple"
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  howItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: howItWorksInView ? `${index * 200}ms` : '0ms' }}
              >
                <div className={`bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
                  <span className="text-3xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Happy Users" },
              { number: "500K+", label: "Mock Interviews" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "Available" }
            ].map((stat, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  statsInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{ transitionDelay: statsInView ? `${index * 150}ms` : '0ms' }}
              >
                <div className="text-5xl font-bold text-white mb-2 animate-counter">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-6 py-3 rounded-full text-sm font-medium mb-6">
              ⭐ Success Stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of professionals who have improved their interview skills
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer at Google",
                avatar: "S",
                rating: 5,
                testimonial: "AI MockPrep helped me prepare for my Google interview. The feedback was incredibly detailed and helped me improve significantly!",
                color: "blue"
              },
              {
                name: "Michael Chen",
                role: "Product Manager at Meta",
                avatar: "M",
                rating: 5,
                testimonial: "The AI-generated questions were spot on! I felt so much more confident walking into my real interview.",
                color: "green"
              },
              {
                name: "Emily Rodriguez",
                role: "Data Scientist at Netflix",
                avatar: "E",
                rating: 5,
                testimonial: "Amazing platform! The real-time feedback feature is a game-changer. Highly recommend to anyone preparing for interviews.",
                color: "purple"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-${testimonial.color}-50 to-${testimonial.color}-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                  testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: testimonialsInView ? `${index * 200}ms` : '0ms' }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-${testimonial.color}-600 rounded-full flex items-center justify-center text-white font-bold mr-4`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have improved their interview skills with AI MockPrep
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                Start Practicing Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Brain className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">AI MockPrep</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Revolutionizing interview preparation with AI-powered mock interviews and personalized feedback.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors duration-300">AI Questions</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Real-time Feedback</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Performance Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Job-specific Practice</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 AI MockPrep. All rights reserved. Built with ❤️ for your success.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
