import { NextResponse } from 'next/server'
import { getMockInterviewsByUser, getUserAnswersByMockId } from '@/utils/firebaseOperations'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userEmail = searchParams.get('userEmail')
    
    if (!userEmail) {
      return NextResponse.json({ error: 'User email is required' }, { status: 400 })
    }

    // Fetch interviews from Firebase
    const interviews = await getMockInterviewsByUser(userEmail)
    
    let allRatings = []
    let skillRatings = {}
    let completedCount = 0
    let recentPerformance = []
    let monthlyData = {}

    // Process each interview
    for (const interview of interviews) {
      try {
        const feedback = await getUserAnswersByMockId(interview.mockId)
        
        if (feedback && feedback.length > 0) {
          completedCount++
          
          // Calculate interview average
          const interviewRatings = feedback.map(item => {
            const rating = parseInt(item.rating?.split('/')[0]) || 0
            return rating
          })
          
          const avgRating = interviewRatings.reduce((sum, rating) => sum + rating, 0) / interviewRatings.length
          allRatings.push(avgRating)
          
          // Add to recent performance
          recentPerformance.push({
            date: interview.createdAt,
            score: Math.round(avgRating * 10), // Convert to percentage
            jobPosition: interview.jobPosition
          })

          // Group by month for monthly progress
          const month = new Date(interview.createdAt).toISOString().substring(0, 7) // YYYY-MM
          if (!monthlyData[month]) {
            monthlyData[month] = { scores: [], count: 0 }
          }
          monthlyData[month].scores.push(avgRating)
          monthlyData[month].count++

          // Skill breakdown (simulated based on job position)
          const position = interview.jobPosition.toLowerCase()
          if (position.includes('frontend') || position.includes('react')) {
            skillRatings['Frontend Development'] = (skillRatings['Frontend Development'] || []).concat(interviewRatings)
          } else if (position.includes('backend') || position.includes('node')) {
            skillRatings['Backend Development'] = (skillRatings['Backend Development'] || []).concat(interviewRatings)
          } else if (position.includes('full')) {
            skillRatings['Full Stack Development'] = (skillRatings['Full Stack Development'] || []).concat(interviewRatings)
          } else {
            skillRatings['General Programming'] = (skillRatings['General Programming'] || []).concat(interviewRatings)
          }
        }
      } catch (error) {
        console.error('Error processing interview:', interview.mockId, error)
      }
    }

    // Calculate metrics
    const totalInterviews = interviews.length
    const completionRate = totalInterviews > 0 ? Math.round((completedCount / totalInterviews) * 100) : 0
    const averageScore = allRatings.length > 0 ? Math.round(allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length) : 0
    
    // Calculate improvement rate
    let improvementRate = 0
    if (recentPerformance.length >= 2) {
      const sortedPerformance = recentPerformance.sort((a, b) => new Date(a.date) - new Date(b.date))
      const firstHalf = sortedPerformance.slice(0, Math.ceil(sortedPerformance.length / 2))
      const secondHalf = sortedPerformance.slice(Math.ceil(sortedPerformance.length / 2))
      
      const firstAvg = firstHalf.reduce((sum, p) => sum + p.score, 0) / firstHalf.length
      const secondAvg = secondHalf.reduce((sum, p) => sum + p.score, 0) / secondHalf.length
      
      improvementRate = Math.round(((secondAvg - firstAvg) / firstAvg) * 100)
    }

    // Process skill breakdown
    const processedSkillBreakdown = {}
    Object.keys(skillRatings).forEach(skill => {
      const ratings = skillRatings[skill]
      const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      processedSkillBreakdown[skill] = Math.round(avgRating * 10) // Convert to percentage
    })

    // Process monthly progress
    const monthlyProgress = Object.keys(monthlyData)
      .sort()
      .slice(-6) // Last 6 months
      .map(month => {
        const data = monthlyData[month]
        const avgScore = data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length
        return {
          month,
          score: Math.round(avgScore * 10),
          interviews: data.count
        }
      })

    // Generate strengths and weaknesses
    const skillEntries = Object.entries(processedSkillBreakdown)
    const strengths = skillEntries
      .filter(([skill, score]) => score >= 70)
      .map(([skill, score]) => ({ skill, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    const weaknesses = skillEntries
      .filter(([skill, score]) => score < 60)
      .map(([skill, score]) => ({ skill, score }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)

    const analyticsData = {
      totalInterviews,
      completedInterviews: completedCount,
      completionRate,
      averageScore,
      improvementRate,
      skillBreakdown: processedSkillBreakdown,
      recentPerformance: recentPerformance.slice(-10), // Last 10 interviews
      strengthsWeaknesses: { strengths, weaknesses },
      monthlyProgress
    }

    return NextResponse.json({ analytics: analyticsData })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
