"use client"
import { Button } from '@/components/ui/button'
import { getMockInterviewById } from '@/utils/firebaseOperations'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {

    const [InterviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    useEffect(()=>{

        GetInterviewDetails();
    }, [])

    const GetInterviewDetails=async()=>{
        try {

            const result = await getMockInterviewById(params.interviewId);
            if (result) {

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
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="text-center">
            <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
              Let's Get Started
            </h2>
            <p className="text-gray-600 text-lg">Prepare yourself for the AI-powered mock interview</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='flex flex-col gap-5'>
            {/* Interview Details Card */}
            <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3">
                <h2 className='text-lg font-semibold text-white'>Interview Details</h2>
              </div>
              <div className="flex flex-col p-5 gap-3">
                <h2 className='text-base text-gray-800'><strong className="text-blue-600">Job Role/Job Position: </strong>{InterviewData?.jobPosition}</h2>
                <h2 className='text-base text-gray-800'><strong className="text-purple-600">Job Description/Tech Stack: </strong>{InterviewData?.jobDesc}</h2>
                <h2 className='text-base text-gray-800'><strong className="text-green-600">Years of Experience: </strong>{InterviewData?.jobExperience}</h2>
                <h2 className='text-base text-gray-800'><strong className="text-orange-600">Interview Type: </strong><span className="capitalize">{InterviewData?.interviewType || 'Technical'}</span></h2>
              </div>
            </div>

            {/* Information Card */}
            <div className='bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 shadow-lg'>
              <div className="p-5">
                <h2 className='flex gap-2 items-center text-lg font-semibold text-amber-800 mb-3'>
                  <Lightbulb className="text-amber-600 w-5 h-5"/>
                  <strong>Information</strong>
                </h2>
                <h2 className='text-amber-700 text-base leading-relaxed'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
              </div>
            </div>
          </div>
          {/* Camera Section */}
          <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
            <div className="bg-gradient-to-r from-green-500 to-blue-500 px-5 py-3">
              <h2 className='text-lg font-semibold text-white'>Camera & Microphone Setup</h2>
            </div>
            <div className="p-5">
              {webCamEnabled? <Webcam onUserMedia={()=>setWebCamEnabled(true)} onUserMediaError={()=>setWebCamEnabled(false)} mirrored={true} style={{
                  height: 280,
                  width: '100%',
                  borderRadius: '8px'
              }}/>
              :
              <>
              <div className='flex flex-col gap-5'>
              <WebcamIcon className='h-56 w-full my-5 p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 text-gray-400'/>
              <Button className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300" onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
              </div>
              </>}
            </div>
          </div>
        </div>
      </div>

      {/* Start Interview Button */}
      <div className='max-w-7xl mx-auto px-6 pb-8'>
        <div className='flex justify-end items-end'>
          <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
            <Button className="cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">Start Interview</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Interview
