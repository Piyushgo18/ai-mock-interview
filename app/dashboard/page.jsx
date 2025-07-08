"use client"
import React, { useState, useEffect } from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import { Target, TrendingUp, Clock, Award, Lightbulb, BookOpen } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { getMockInterviewsByUser, getUserAnswersByMockId } from '@/utils/firebaseOperations'

function Dashboard() {
  const { user } = useUser();
  const [stats, setStats] = useState({
    totalInterviews: 0,
    thisMonth: 0,
    successRate: 0,
    bestScore: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const interviews = await getMockInterviewsByUser(user?.primaryEmailAddress?.emailAddress);
      
      // Calculate basic stats
      const totalInterviews = interviews.length;
      
      // Calculate this month's interviews
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const thisMonth = interviews.filter(interview => {
        try {
          let interviewDate;
          
          // Handle different date formats
          if (interview.createdAt.includes('T')) {
            // ISO string format: "2025-01-07T12:34:56.789Z"
            interviewDate = new Date(interview.createdAt);
          } else if (interview.createdAt.includes('-') && interview.createdAt.length === 10) {
            // DD-MM-YYYY format: "07-01-2025"
            const parts = interview.createdAt.split('-');
            interviewDate = new Date(parts[2], parts[1] - 1, parts[0]); // year, month-1, day
          } else {
            // Fallback: try to parse as-is
            interviewDate = new Date(interview.createdAt);
          }
          
          
          return interviewDate.getMonth() === currentMonth && interviewDate.getFullYear() === currentYear;
        } catch (error) {
          console.error('Error parsing date:', interview.createdAt, error);
          return false;
        }
      }).length;
      
      // Calculate real performance stats from feedback data
      let allRatings = [];
      let completedInterviews = 0;
      
      for (const interview of interviews) {
        try {
          const feedback = await getUserAnswersByMockId(interview.mockId);
          if (feedback && feedback.length > 0) {
            completedInterviews++;
            // Extract ratings from feedback
            feedback.forEach(item => {
              if (item.rating) {
                const rating = parseInt(item.rating.split('/')[0]) || 0;
                allRatings.push(rating);
              }
            });
          }
        } catch (error) {
          console.error('Error fetching feedback for interview:', interview.mockId, error);
        }
      }
      
      // Calculate success rate (interviews with feedback / total interviews)
      const successRate = totalInterviews > 0 ? Math.round((completedInterviews / totalInterviews) * 100) : 0;
      
      // Calculate best score (highest average rating from any interview)
      const bestScore = allRatings.length > 0 ? Math.max(...allRatings) * 10 : 0; // Convert to percentage
      
      setStats({
        totalInterviews,
        thisMonth,
        successRate,
        bestScore
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    
    <div className='min-h-screen relative'>     
      
      {/* Simple Header */}
      <div className='bg-white/90 backdrop-blur-sm border-b border-gray-200 px-6 py-4'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-2xl text-gray-900'>
            <span className='text-shadow-stone-800 text-3xl'>Welcome,</span> <span className='font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>{user?.firstName || 'User'}</span>
          </h1>
          <p className='text-gray-600 mt-1'>Prepare for your interviews with AI-powered practice sessions</p>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* Quick Stats */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
            <div className='flex items-center'>
              <div className='p-2 bg-blue-50 rounded-lg'>
                <Target className='h-5 w-5 text-blue-600' />
              </div>
              <div className='ml-3'>
                <p className='text-sm text-gray-600'>Total Interviews</p>
                <p className='text-xl font-semibold text-gray-900'>
                  {loading ? '...' : stats.totalInterviews}
                </p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
            <div className='flex items-center'>
              <div className='p-2 bg-green-50 rounded-lg'>
                <TrendingUp className='h-5 w-5 text-green-600' />
              </div>
              <div className='ml-3'>
                <p className='text-sm text-gray-600'>Completion Rate</p>
                <p className='text-xl font-semibold text-gray-900'>
                  {loading ? '...' : `${stats.successRate}%`}
                </p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
            <div className='flex items-center'>
              <div className='p-2 bg-purple-50 rounded-lg'>
                <Clock className='h-5 w-5 text-purple-600' />
              </div>
              <div className='ml-3'>
                <p className='text-sm text-gray-600'>This Month</p>
                <p className='text-xl font-semibold text-gray-900'>
                  {loading ? '...' : stats.thisMonth}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
            <div className='flex items-center'>
              <div className='p-2 bg-orange-50 rounded-lg'>
                <Award className='h-5 w-5 text-orange-600' />
              </div>
              <div className='ml-3'>
                <p className='text-sm text-gray-600'>Best Score</p>
                <p className='text-xl font-semibold text-gray-900'>
                  {loading ? '...' : stats.bestScore > 0 ? `${stats.bestScore}%` : '0%'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Create New Interview Section */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-2'>Create Your Next Interview</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Set up a personalized mock interview tailored to your target role. 
              Our AI will generate relevant questions to help you prepare.
            </p>
          </div>
          
          <div className='max-w-lg mx-auto'>
            <AddNewInterview />
          </div>
        </div>

        {/* Interview History Section */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8'>
          <InterviewList/>
        </div>

        {/* Interview Tips */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-blue-50 rounded-lg p-6 border border-blue-100'>
            <div className='flex items-center mb-4'>
              <div className='p-2 bg-blue-600 rounded-lg'>
                <Lightbulb className='h-5 w-5 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-blue-900 ml-3'>Interview Tips</h3>
            </div>
            <ul className='space-y-2 text-blue-800 text-sm'>
              <li className='flex items-start'>
                <span className='text-blue-600 mr-2 mt-1'>•</span>
                Practice the STAR method (Situation, Task, Action, Result) for behavioral questions
              </li>
              <li className='flex items-start'>
                <span className='text-blue-600 mr-2 mt-1'>•</span>
                Research the company and role thoroughly before your interview
              </li>
              <li className='flex items-start'>
                <span className='text-blue-600 mr-2 mt-1'>•</span>
                Prepare thoughtful questions to ask your interviewer
              </li>
              <li className='flex items-start'>
                <span className='text-blue-600 mr-2 mt-1'>•</span>
                Practice speaking clearly and maintaining good eye contact
              </li>
            </ul>
          </div>
          
          <div className='bg-green-50 rounded-lg p-6 border border-green-100'>
            <div className='flex items-center mb-4'>
              <div className='p-2 bg-green-600 rounded-lg'>
                <BookOpen className='h-5 w-5 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-green-900 ml-3'>Best Practices</h3>
            </div>
            <ul className='space-y-2 text-green-800 text-sm'>
              <li className='flex items-start'>
                <span className='text-green-600 mr-2 mt-1'>•</span>
                Review and analyze your feedback after each practice session
              </li>
              <li className='flex items-start'>
                <span className='text-green-600 mr-2 mt-1'>•</span>
                Practice regularly to build confidence and improve fluency
              </li>
              <li className='flex items-start'>
                <span className='text-green-600 mr-2 mt-1'>•</span>
                Time yourself to ensure your answers are concise and focused
              </li>
              <li className='flex items-start'>
                <span className='text-green-600 mr-2 mt-1'>•</span>
                Record yourself to identify areas for improvement in delivery
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
