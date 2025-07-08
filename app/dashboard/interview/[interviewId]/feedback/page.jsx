"use client"
import { getUserAnswersByMockId } from '@/utils/firebaseOperations'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { chatSession } from '@/utils/GeminiAIModal'

function Feedback({params}) {
    const resolvedParams = React.use(params);
    const [feedbackList, setFeedbackList] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [loadingAnswers, setLoadingAnswers] = useState({});
    const router=useRouter();
    useEffect(()=>{
        GetFeedback();
    },[])
    const GetFeedback=async()=>{
        try {
            const result = await getUserAnswersByMockId(resolvedParams.interviewId);

            setFeedbackList(result);
        } catch (error) {
            console.error('Error fetching feedback:', error);
            setFeedbackList([]);
        }
    }

    const generateCorrectAnswer = async (question, index) => {
        if (correctAnswers[index] || loadingAnswers[index]) return;
        
        setLoadingAnswers(prev => ({ ...prev, [index]: true }));
        
        try {
            const prompt = `You are an expert interviewer. Provide a comprehensive, professional answer to this interview question. Keep it concise but complete (150-200 words).

Question: ${question}

Requirements:
1. Provide a clear, structured answer
2. Include key points and best practices
3. Use professional language
4. Make it suitable for an experienced candidate
5. Return only the answer text, no extra formatting

Answer:`;


            const result = await chatSession.sendMessage(prompt);
            const answer = result.response.text().trim();
            
            setCorrectAnswers(prev => ({ ...prev, [index]: answer }));

            
        } catch (error) {
            console.error('Error generating correct answer:', error);
            setCorrectAnswers(prev => ({ 
                ...prev, 
                [index]: 'Unable to generate correct answer at this time. Please try again later.' 
            }));
        } finally {
            setLoadingAnswers(prev => ({ ...prev, [index]: false }));
        }
    }

    const calculateOverallRating = () => {
        if (feedbackList.length === 0) return 0;
        
        const totalRating = feedbackList.reduce((sum, item) => {
            const rating = parseInt(item.rating?.split('/')[0]) || 0;
            return sum + rating;
        }, 0);
        
        return Math.round(totalRating / feedbackList.length);
    }

    const cleanFeedbackText = (text) => {
        if (!text) return text;
        return text
            .replace(/\*\*/g, '') // Remove ** markdown formatting
            .replace(/\*/g, '') // Remove single * formatting
            .replace(/#{1,6}\s/g, '') // Remove markdown headers
            .replace(/(\d+\.\s)/g, '\n$1') // Add line break before numbered points
            .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
            .replace(/^\n+/, '') // Remove leading newlines
            .trim();
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      
      {feedbackList?.length==0?
      <div className="flex items-center justify-center h-screen">
        <div className="text-center bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className='font-bold text-lg text-gray-500'>No Interview Feedback Record Found</h2>
          <p className="text-gray-400 mt-1 text-sm">Complete an interview to see your feedback here</p>
          <Button 
            className='mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer' 
            onClick={()=>router.replace('/dashboard')}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
        : 
        <div className="max-w-5xl mx-auto px-4 py-6">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="text-center">
              <h2 className='text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2'>Congratulations!</h2>
              <h2 className='font-bold text-xl text-gray-800 mb-3'>Here is your interview feedback</h2>
              {feedbackList.length > 0 && (
                <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-medium text-base shadow-md">
                  Your overall interview rating: <strong className="ml-2">{calculateOverallRating()}/10</strong>
                </div>
              )}
              <h2 className='text-gray-600 mt-3 text-sm max-w-xl mx-auto'>Find below interview question with answer rating, Your answer and feedback for improvement</h2>
            </div>
          </div>

          {/* Feedback List */}
          <div className="space-y-4">
            {feedbackList&&feedbackList.map((item,index)=>(
              <Collapsible key={index} className='bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden'>
              <CollapsibleTrigger 
                className='p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 text-left flex justify-between w-full items-center group'
                onClick={() => generateCorrectAnswer(item.question, index)}
              >
                <span className="font-medium text-gray-800 group-hover:text-gray-900 pr-3 text-sm">{item.question}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">Q{index + 1}</span>
                  <ChevronsUpDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"/>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='p-4 space-y-3'>
                  <div className='bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-lg shadow-sm'>
                    <strong className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      Rating: {item.rating}
                    </strong>
                  </div>
                  <div className='p-3 border border-red-200 rounded-lg bg-gradient-to-br from-red-50 to-pink-50'>
                    <strong className="text-red-700 flex items-center gap-2 mb-2 text-sm">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Your Answer:
                    </strong> 
                    <pre className='whitespace-pre-wrap font-sans text-red-900 text-sm leading-relaxed'>{cleanFeedbackText(item.userAns)}</pre>
                  </div>
                  <div className='p-3 border border-green-200 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50'>
                    <strong className="text-green-700 flex items-center gap-2 mb-2 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Correct Answer:
                    </strong> 
                    {loadingAnswers[index] ? (
                      <div className='flex items-center gap-2 mt-1'>
                        <LoaderCircle className='animate-spin w-4 h-4 text-green-600'/>
                        <span className='text-green-600 font-medium text-sm'>Generating correct answer...</span>
                      </div>
                    ) : correctAnswers[index] ? (
                      <pre className='whitespace-pre-wrap font-sans text-green-900 text-sm leading-relaxed'>{cleanFeedbackText(correctAnswers[index])}</pre>
                    ) : (
                      <div className='mt-1 text-green-600 italic font-medium text-sm'>Click to expand and generate correct answer</div>
                    )}
                  </div>
                  <div className='p-3 border border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50'>
                    <strong className="text-blue-700 flex items-center gap-2 mb-2 text-sm">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Feedback:
                    </strong> 
                    <pre className='whitespace-pre-wrap font-sans text-blue-900 text-sm leading-relaxed'>{cleanFeedbackText(item.feedback)}</pre>
                  </div>
                </div>
              </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {/* Go Home Button */}
          <div className='flex justify-center items-center mt-8'>
            <Button className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer' onClick={()=>router.replace('/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      }
      
    </div>
    
  )
}

export default Feedback
