'use client'
import React, { use, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { saveUserAnswer } from '@/utils/firebaseOperations'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({ mockInterviewQuestions, activeQuestionIndex , interviewData}) {
    const [userAnswer, setUserAnswer] = useState('');
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result)=>{
        setUserAnswer(prevAns=>prevAns+result?.transcript)
    })
  },[results])

  useEffect(() => {
    if(!isRecording && userAnswer?.length>10){
        UpdateUserAnswer();
    }
    
  },[userAnswer])

     const StartStopRecording=async()=>{
        if(isRecording){
           
            stopSpeechToText();
            
            
        }
        else{
            startSpeechToText();
        }
     }

     const UpdateUserAnswer=async()=>{
        try {

            setLoading(true);
            const feedbackPrompt="Question: "+ (mockInterviewQuestions[activeQuestionIndex]?.question || mockInterviewQuestions[activeQuestionIndex]?.Question) +", User Answer: "+userAnswer+". Based on the question and user answer, please provide a rating out of 10 and feedback for improvement. Respond ONLY with valid JSON in this exact format: {\"rating\": \"X/10\", \"feedback\": \"your feedback here\"}";
            
            const result = await chatSession.sendMessage(feedbackPrompt);
            let mockjsonResp=(result.response.text()).replace('```json','').replace('```','').trim();
            
            // Additional cleaning to remove any extra text
            const jsonStart = mockjsonResp.indexOf('{');
            const jsonEnd = mockjsonResp.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1) {
                mockjsonResp = mockjsonResp.substring(jsonStart, jsonEnd + 1);
            }
            

            
            let JsonFeedbacResp;
            try {
                JsonFeedbacResp = JSON.parse(mockjsonResp);
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                JsonFeedbacResp = {
                    rating: "5/10",
                    feedback: "Unable to generate feedback due to response format issue."
                };
            }



            const resp = await saveUserAnswer({
                mockId: interviewData?.mockId,
                question: mockInterviewQuestions[activeQuestionIndex]?.question || mockInterviewQuestions[activeQuestionIndex]?.Question,
                userAns: userAnswer,
                feedback: JsonFeedbacResp?.feedback,
                rating: JsonFeedbacResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy')
            })
            

            
            if(resp){
                toast('User Answer Recorded Successfully');
                setUserAnswer('');
                setResults([]);
            }
        } catch (error) {
            console.error('Error in UpdateUserAnswer:', error);
            toast('Error recording answer. Please try again.');
        } finally {
            setResults([]);
            setLoading(false);
        }
     }

  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/webcam.jpg'} width={350} height={350} className='absolute'/>
      <Webcam
      mirrored={true}
      style={{
        height: 300,
        width: '100%',
        zIndex: 10,
      }}
      />
    </div>
    <Button disabled={loading} variant='outline' className='my-10 cursor-pointer' onClick={StartStopRecording}>
        {isRecording?
            <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
                <StopCircle/>
                Stop Recording
            </h2>
        :
            <h2 className='text-primary flex gap-2 items-center'>
                <Mic/> Record Answer </h2>}</Button>


    </div>
  )
}

export default RecordAnswerSection
