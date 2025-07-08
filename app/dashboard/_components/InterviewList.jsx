"use client"
import { getMockInterviewsByUser } from '@/utils/firebaseOperations';
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';
import { Calendar, Search } from 'lucide-react';

function InterviewList() {

    const {user}=useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        user&&GetInterviewList();
    },[user])

    const GetInterviewList=async()=>{
        try {
            setLoading(true);

            
            if (!user?.primaryEmailAddress?.emailAddress) {

                setLoading(false);
                return;
            }
            

            
            const result = await getMockInterviewsByUser(user?.primaryEmailAddress?.emailAddress);

            
            setInterviewList(result);
        } catch (error) {
            console.error('Error fetching interviews:', error);
            console.error('Error type:', error.constructor.name);
            console.error('Error message:', error.message);
            
            // Set empty array to prevent crashes
            setInterviewList([]);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <h2 className='font-semibold text-xl text-gray-900'>Your Interview History</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-gray-200 animate-pulse rounded-xl h-48"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (interviewList.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Interviews Yet</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                    You haven't created any mock interviews yet. Click "Create New Interview" above to get started with your interview preparation.
                </p>
            </div>
        );
    }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-blue-600" />
        <h2 className='font-semibold text-xl text-gray-900'>Your Interview History</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {interviewList.length}
        </span>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {interviewList.map((interview,index)=>(
            <InterviewItemCard interview={interview} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default InterviewList
