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
    
    // Fetch feedback for each interview to get completion status and scores
    const interviewsWithFeedback = await Promise.all(
      interviews.map(async (interview) => {
        try {
          const feedback = await getUserAnswersByMockId(interview.mockId)
          const isCompleted = feedback && feedback.length > 0
          
          // Calculate average score if feedback exists
          let averageScore = 0
          if (isCompleted && feedback.length > 0) {
            const scores = feedback
              .filter(f => f.rating)
              .map(f => parseInt(f.rating.split('/')[0]) || 0)
            averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
          }

          return {
            ...interview,
            isCompleted,
            feedback,
            averageScore,
            totalQuestions: feedback?.length || 0
          }
        } catch (error) {
          console.error('Error fetching feedback for interview:', interview.mockId, error)
          return {
            ...interview,
            isCompleted: false,
            feedback: [],
            averageScore: 0,
            totalQuestions: 0
          }
        }
      })
    )

    return NextResponse.json({ interviews: interviewsWithFeedback })
  } catch (error) {
    console.error('Error fetching interviews:', error)
    return NextResponse.json({ error: 'Failed to fetch interviews' }, { status: 500 })
  }
}
