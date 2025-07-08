"use client"
import React, {useEffect, useState } from 'react'
import { getMockInterviewById } from '@/utils/firebaseOperations'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function StartInterview({params}) {
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    useEffect(()=>{
        GetInterviewDetails();
    },[])

    const GetInterviewDetails=async()=>{
        try {

            const result = await getMockInterviewById(params.interviewId);
            if (result) {

                const jsonMockResp = JSON.parse(result.jsonMockResp);

                setMockInterviewQuestions(jsonMockResp);
                setInterviewData(result);
            } else {
                console.error('No interview found with ID:', params.interviewId);
                alert('Interview not found. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching interview details:', error);
            alert('Error loading interview: ' + error.message);
        }
    }
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>    
    {!mockInterviewQuestions || !interviewData ? (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-6"></div>
                <p className="text-lg font-medium text-gray-700">Loading interview questions...</p>
                <p className="text-sm text-gray-500 mt-2">Preparing your personalized interview experience</p>
            </div>
        </div>
    ) : (
        <div className="max-w-7xl mx-auto px-6 py-2">
            {/* Header Section */}
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    Mock Interview in Progress
                </h1>
                <p className="text-gray-600 text-sm">
                    Question {activeQuestionIndex + 1} of {mockInterviewQuestions?.length} • {interviewData?.jobPosition}
                </p>
            </div>

            {/* Main Content */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-2'>
              <QuestionsSection mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex}/>
                <RecordAnswerSection mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}/>
            </div>
            {/* Navigation Buttons */}
            <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-3'>
                <div className='flex justify-end items-center gap-4'>
                    <div className="flex items-center gap-3">
                        {activeQuestionIndex>0&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)} className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'>Previous Question</Button>}
                        {activeQuestionIndex!=mockInterviewQuestions?.length-1&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)} className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'>Next Question</Button>}
                        {activeQuestionIndex==mockInterviewQuestions?.length-1&&
                        <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
                        <Button className='bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer'>End Interview</Button>
                        </Link>}
                    </div>
                </div>
            </div>
        </div>
    )}
    </div>
  )
}

export default StartInterview
