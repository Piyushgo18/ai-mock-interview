"use client"
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Award, 
  Lock, 
  Trophy, 
  Calendar,
  Clock,
  Brain,
  Star,
  Activity,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Simple Chart Components (you can replace with Chart.js or Recharts later)
const ProgressBar = ({ percentage, color = "blue" }) => (
  <div className="w-full bg-gray-200 rounded-full h-3">
    <div 
      className={`bg-${color}-500 h-3 rounded-full transition-all duration-500`}
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
)

const StatCard = ({ title, value, icon: Icon, color, isLocked = false, description }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${isLocked ? 'opacity-60' : ''}`}>
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 bg-${color}-50 rounded-xl`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{isLocked ? '🔒' : value}</h3>
    <p className="text-gray-600 text-sm mt-1">{title}</p>
    {description && <p className="text-xs text-gray-500 mt-2">{description}</p>}
  </div>
)

const Analytics = () => {
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState({
    totalInterviews: 0,
    completedInterviews: 0,
    completionRate: 0,
    averageScore: 0,
    improvementRate: 0,
    skillBreakdown: {},
    recentPerformance: [],
    strengthsWeaknesses: { strengths: [], weaknesses: [] },
    monthlyProgress: []
  })

  // Check if user is Pro
  const isPro = user?.publicMetadata?.subscription === 'pro'

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchAnalyticsData()
    }
  }, [user])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      
      const response = await fetch(`/api/analytics?userEmail=${encodeURIComponent(user?.primaryEmailAddress?.emailAddress)}`)
      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }
      
      const data = await response.json()
      setAnalyticsData(data.analytics || {
        totalInterviews: 0,
        completedInterviews: 0,
        completionRate: 0,
        averageScore: 0,
        improvementRate: 0,
        skillBreakdown: {},
        recentPerformance: [],
        strengthsWeaknesses: { strengths: [], weaknesses: [] },
        monthlyProgress: []
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'green'
    if (score >= 60) return 'yellow' 
    return 'red'
  }

  const getImprovementColor = (rate) => {
    if (rate > 0) return 'green'
    if (rate < 0) return 'red'
    return 'gray'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading your analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Performance Analytics
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track your interview performance and identify areas for improvement
          </p>
        </div>

        {/* Pro Banner */}
        {!isPro && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Trophy className="w-12 h-12 text-yellow-500" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Unlock Advanced Analytics</h3>
                  <p className="text-gray-600">Get detailed insights, skill breakdowns, and personalized recommendations</p>
                </div>
              </div>
              <Link href="/upgrade">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3">
                  <Trophy className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Interviews"
            value={analyticsData.totalInterviews}
            icon={Target}
            color="blue"
            description="Practice sessions completed"
          />
          <StatCard
            title="Completion Rate"
            value={`${analyticsData.completionRate || 0}%`}
            icon={Activity}
            color="green"
            description="Interviews with feedback"
          />
          <StatCard
            title="Average Score"
            value={`${analyticsData.averageScore}%`}
            icon={Star}
            color={getScoreColor(analyticsData.averageScore)}
            description="Overall performance rating"
          />
          <StatCard
            title="Improvement Rate"
            value={analyticsData.improvementRate > 0 ? `+${analyticsData.improvementRate}%` : `${analyticsData.improvementRate}%`}
            icon={TrendingUp}
            color={getImprovementColor(analyticsData.improvementRate)}
            description="Performance trend"
            isLocked={!isPro}
          />
        </div>

        {/* Skills Breakdown - Pro Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${!isPro ? 'opacity-60' : ''}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Brain className="w-6 h-6 text-purple-600" />
                Skills Performance
              </h3>
              {!isPro && <Lock className="w-5 h-5 text-gray-400" />}
            </div>
            
            {!isPro ? (
              <div className="text-center py-8">
                <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Unlock detailed skill analysis with Pro</p>
                <Link href="/upgrade">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    <Trophy className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(analyticsData.skillBreakdown).map(([skill, data]) => (
                  <div key={skill}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">{skill}</span>
                      <span className="text-sm text-gray-500">{data.average}% ({data.count} interviews)</span>
                    </div>
                    <ProgressBar percentage={data.average} color={getScoreColor(data.average)} />
                  </div>
                ))}
                {Object.keys(analyticsData.skillBreakdown).length === 0 && (
                  <p className="text-gray-500 text-center py-4">Complete more interviews to see skill breakdown</p>
                )}
              </div>
            )}
          </div>

          {/* Strengths & Weaknesses - Pro Feature */}
          <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${!isPro ? 'opacity-60' : ''}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                Insights
              </h3>
              {!isPro && <Lock className="w-5 h-5 text-gray-400" />}
            </div>
            
            {!isPro ? (
              <div className="text-center py-8">
                <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Get personalized insights with Pro</p>
                <Link href="/upgrade">
                  <Button className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white">
                    <Trophy className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Strengths
                  </h4>
                  <div className="space-y-2">
                    {analyticsData.strengthsWeaknesses.strengths.map((strength, index) => (
                      <div key={index} className="bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm">
                        {strength}
                      </div>
                    ))}
                    {analyticsData.strengthsWeaknesses.strengths.length === 0 && (
                      <p className="text-gray-500 text-sm">Complete more interviews to identify strengths</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Areas to Improve
                  </h4>
                  <div className="space-y-2">
                    {analyticsData.strengthsWeaknesses.weaknesses.map((weakness, index) => (
                      <div key={index} className="bg-red-50 text-red-800 px-3 py-2 rounded-lg text-sm">
                        {weakness}
                      </div>
                    ))}
                    {analyticsData.strengthsWeaknesses.weaknesses.length === 0 && (
                      <p className="text-gray-500 text-sm">Complete more interviews to identify areas for improvement</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Performance */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Recent Performance
          </h3>
          
          {analyticsData.recentPerformance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.recentPerformance.map((performance, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(performance.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-gray-900 font-medium">{performance.role}</td>
                      <td className="py-3 px-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {performance.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-bold text-${getScoreColor(performance.score * 10)}-600`}>
                          {Math.round(performance.score * 10)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No interview data available yet</p>
              <p className="text-gray-400 text-sm mt-1">Complete some interviews to see your performance history</p>
            </div>
          )}
        </div>

        {/* Monthly Progress - Pro Feature */}
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${!isPro ? 'opacity-60' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              Monthly Progress
            </h3>
            {!isPro && <Lock className="w-5 h-5 text-gray-400" />}
          </div>
          
          {!isPro ? (
            <div className="text-center py-8">
              <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Unlock monthly progress tracking with Pro</p>
              <Link href="/upgrade">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                  <Trophy className="w-4 h-4 mr-2" />
                  Upgrade Now
                </Button>
              </Link>
            </div>
          ) : analyticsData.monthlyProgress.length > 0 ? (
            <div className="space-y-4">
              {analyticsData.monthlyProgress.map((month, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{month.month}</span>
                    <span className="text-sm text-gray-500">{month.average}% ({month.count} interviews)</span>
                  </div>
                  <ProgressBar percentage={month.average} color={getScoreColor(month.average)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No monthly data available yet</p>
              <p className="text-gray-400 text-sm mt-1">Complete interviews over multiple months to see progress</p>
            </div>
          )}
        </div>

        {/* Upgrade CTA */}
        {!isPro && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8">
              <Trophy className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Unlock Full Analytics</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Get detailed performance insights, skill breakdowns, improvement recommendations, and more with Pro.
              </p>
              <Link href="/upgrade">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg">
                  <Trophy className="w-5 h-5 mr-2" />
                  Upgrade to Pro
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics
