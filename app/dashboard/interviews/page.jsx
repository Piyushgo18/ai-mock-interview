"use client"
import React, { useState, useEffect } from 'react'
import { 
  Clock, 
  Calendar, 
  BarChart3, 
  Play, 
  Eye, 
  Download, 
  Filter,
  Search,
  Star,
  TrendingUp,
  Award,
  Target,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

const MyInterviews = () => {
  const { user } = useUser()
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'completed', 'incomplete'
  const [sortBy, setSortBy] = useState('date') // 'date', 'score', 'title'

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchInterviews()
    }
  }, [user])

  const fetchInterviews = async () => {
    try {
      setLoading(true)
      
      const response = await fetch(`/api/interviews?userEmail=${encodeURIComponent(user?.primaryEmailAddress?.emailAddress)}`)
      if (!response.ok) {
        throw new Error('Failed to fetch interviews')
      }
      
      const data = await response.json()
      setInterviews(data.interviews || [])
    } catch (error) {
      console.error('Error fetching interviews:', error)
      setInterviews([])
    } finally {
      setLoading(false)
    }
  }

  const filteredAndSortedInterviews = interviews
    .filter(interview => {
      const matchesSearch = interview.jobPosition?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           interview.jobDesc?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = filterStatus === 'all' || 
                           (filterStatus === 'completed' && interview.isCompleted) ||
                           (filterStatus === 'incomplete' && !interview.isCompleted)
      
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.averageScore - a.averageScore
        case 'title':
          return (a.jobPosition || '').localeCompare(b.jobPosition || '')
        case 'date':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

  const stats = {
    total: interviews.length,
    completed: interviews.filter(i => i.isCompleted).length,
    averageScore: interviews.length > 0 
      ? Math.round(interviews.reduce((acc, i) => acc + i.averageScore, 0) / interviews.length)
      : 0,
    thisMonth: interviews.filter(interview => {
      const interviewDate = new Date(interview.createdAt)
      const now = new Date()
      return interviewDate.getMonth() === now.getMonth() && 
             interviewDate.getFullYear() === now.getFullYear()
    }).length
  }

  const getStatusBadge = (interview) => {
    if (interview.isCompleted) {
      const score = interview.averageScore
      if (score >= 8) return { text: 'Excellent', color: 'bg-green-100 text-green-800' }
      if (score >= 6) return { text: 'Good', color: 'bg-blue-100 text-blue-800' }
      if (score >= 4) return { text: 'Fair', color: 'bg-yellow-100 text-yellow-800' }
      return { text: 'Needs Work', color: 'bg-red-100 text-red-800' }
    }
    return { text: 'Incomplete', color: 'bg-gray-100 text-gray-800' }
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch (error) {
      return 'Invalid Date'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your interviews...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Interviews</h1>
              <p className="text-gray-600 mt-2">Track your progress and review past interviews</p>
            </div>
            <Button onClick={fetchInterviews} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Interviews</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageScore}/10</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search interviews by job position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="score">Sort by Score</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interviews Grid */}
        {filteredAndSortedInterviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || filterStatus !== 'all' ? 'No interviews found' : 'No interviews yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Start your first mock interview to begin tracking your progress.'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Button asChild>
                <Link href="/dashboard">Start New Interview</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredAndSortedInterviews.map((interview) => {
              const status = getStatusBadge(interview)
              return (
                <div key={interview.mockId} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {interview.jobPosition || 'Interview Session'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(interview.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {interview.jobExperience || 'Not specified'} experience
                        </div>
                        <div className="flex items-center">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          {interview.totalQuestions} questions
                        </div>
                      </div>

                      {interview.jobDesc && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {interview.jobDesc}
                        </p>
                      )}

                      {interview.isCompleted && (
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="font-medium">Score: {interview.averageScore}/10</span>
                          </div>
                          <div className="flex items-center">
                            <Award className="w-4 h-4 text-green-500 mr-1" />
                            <span>Completed {interview.totalQuestions} questions</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      {interview.isCompleted ? (
                        <>
                          <Button 
                            asChild
                            variant="outline" 
                            size="sm"
                          >
                            <Link href={`/dashboard/interview/${interview.mockId}/feedback`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Results
                            </Link>
                          </Button>
                          <Button 
                            asChild
                            size="sm"
                          >
                            <Link href={`/dashboard/interview/${interview.mockId}/start`}>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Retake
                            </Link>
                          </Button>
                        </>
                      ) : (
                        <Button 
                          asChild
                          size="sm"
                        >
                          <Link href={`/dashboard/interview/${interview.mockId}/start`}>
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready for Your Next Interview?</h3>
          <p className="text-lg opacity-90 mb-6">
            Keep practicing to improve your skills and boost your confidence.
          </p>
          <Button 
            asChild
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Link href="/dashboard">
              <Play className="w-4 h-4 mr-2" />
              Start New Interview
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MyInterviews
