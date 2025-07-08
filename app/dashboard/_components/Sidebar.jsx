"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Crown, 
  MessageCircle, 
  Info, 
  ChevronLeft, 
  ChevronRight,
  History,
  Settings,
  HelpCircle,
  Menu,
  X
} from 'lucide-react'
import { useUser } from '@clerk/nextjs'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useUser()

  // Check if user is Pro (you can modify this logic based on your subscription system)
  const isPro = user?.publicMetadata?.subscription === 'pro'

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Overview & Quick Actions'
    },
    {
      name: 'My Interviews',
      href: '/dashboard/interviews',
      icon: History,
      description: 'Interview History'
    },
    {
      name: 'Question Bank',
      href: '/dashboard/questions',
      icon: BookOpen,
      description: 'Practice Questions'
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      description: 'Performance Insights',
      badge: isPro ? null : 'Pro'
    },
    {
      name: 'Upgrade',
      href: '/upgrade',
      icon: Crown,
      description: 'Unlock Premium Features',
      highlight: !isPro
    },
    {
      name: 'About',
      href: '/about',
      icon: Info,
      description: 'Learn More'
    },
    {
      name: 'Contact Us',
      href: '/contact',
      icon: MessageCircle,
      description: 'Get Support'
    },
    {
      name: 'Help Center',
      href: '/dashboard/help',
      icon: HelpCircle,
      description: 'FAQs & Guides'
    }
  ]

  const isActive = (href) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-white p-2 rounded-lg shadow-lg border border-gray-200"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-lg z-40 transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MockInterview
                </h1>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* User Info
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={user?.imageUrl || '/default-avatar.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {user?.firstName || 'User'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {isPro ? 'Pro Member' : 'Free Plan'}
                  </span>
                  {isPro && <Crown className="w-3 h-3 text-yellow-500" />}
                </div>
              </div>
            </div>
          </div>
        )} */}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${active 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${item.highlight ? 'ring-2 ring-yellow-300 ring-opacity-50' : ''}
                  `}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                  {!isCollapsed && (
                    <>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">{item.name}</span>
                          <div className="flex items-center gap-1">
                            {item.badge && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                                {item.badge}
                              </span>
                            )}
                            {item.highlight && (
                              <Crown className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        
      </div>

      {/* Main Content Spacer */}
      <div className={`${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'} transition-all duration-300`}>
        {/* This ensures main content doesn't overlap with sidebar */}
      </div>
    </>
  )
}

export default Sidebar
