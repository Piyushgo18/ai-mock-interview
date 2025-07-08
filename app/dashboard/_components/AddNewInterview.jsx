"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { createMockInterview } from '@/utils/firebaseOperations'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

// Ultra-robust AI question generator with bulletproof JSON handling
async function generateAIQuestions(jobPosition, jobDesc, jobExperience, interviewType, retryCount = 0) {
    const maxRetries = 3;
    
    try {
        // Use a much simpler, more constrained prompt to force better JSON
        let InputPromt;
        
        const questionCount = process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5;
        
        if (interviewType === 'technical') {
            InputPromt = `You are an interview question generator. Return ONLY a valid JSON array with ${questionCount} technical interview questions for ${jobPosition}.

Job details:
- Position: ${jobPosition}
- Tech stack: ${jobDesc}
- Experience: ${jobExperience} years

CRITICAL REQUIREMENTS:
1. Return ONLY valid JSON array - no markdown, no explanations, no extra text
2. Use simple English words only - no quotes, apostrophes, or special characters in text
3. Keep answers under 80 words each
4. Each object must have exactly these keys: "question" and "answer"

JSON array format:
[
{"question": "What is React", "answer": "React is a JavaScript library for building user interfaces using components"},
{"question": "Explain REST APIs", "answer": "REST APIs are web services that use HTTP methods to perform operations on resources"}
]

Generate the JSON array now:`;
        } else {
            InputPromt = `You are an interview question generator. Return ONLY a valid JSON array with ${questionCount} behavioral interview questions for ${jobPosition}.

Job details:
- Position: ${jobPosition}
- Experience: ${jobExperience} years

CRITICAL REQUIREMENTS:
1. Return ONLY valid JSON array - no markdown, no explanations, no extra text
2. Use simple English words only - no quotes, apostrophes, or special characters in text
3. Keep answers under 80 words using STAR method
4. Each object must have exactly these keys: "question" and "answer"

JSON array format:
[
{"question": "Tell me about a challenging project", "answer": "Situation: I faced a tight deadline. Task: Complete the project on time. Action: I organized my workflow and communicated with stakeholders. Result: Project delivered successfully"},
{"question": "Describe a team conflict", "answer": "Situation: Team had different opinions. Task: Resolve the disagreement. Action: I facilitated open discussion and found common ground. Result: Team unity was restored"}
]

Generate the JSON array now:`;
        }
        
        const result = await chatSession.sendMessage(InputPromt);
        let rawResponse = result.response.text();
        
        // Ultra-aggressive cleaning with improved regex patterns
        let cleanedResponse = rawResponse
            .replace(/```json/gi, '')
            .replace(/```/g, '')
            .replace(/`/g, '')
            .replace(/^\s*\n/gm, '')
            // Remove any text before the first [
            .replace(/^[^[]*/, '')
            // Remove any text after the last ]
            .replace(/[^\]]*$/, '')
            .trim();
        
        // Find the JSON array more precisely
        let jsonStart = cleanedResponse.indexOf('[');
        let jsonEnd = cleanedResponse.lastIndexOf(']');
        
        if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
            throw new Error('No valid JSON array found in AI response');
        }
        
        let jsonContent = cleanedResponse.substring(jsonStart, jsonEnd + 1);
        
        // Super aggressive JSON fixing with enhanced patterns
        jsonContent = jsonContent
            // Fix common quote issues
            .replace(/'/g, '"')
            // Fix smart quotes
            .replace(/[""]/g, '"')
            .replace(/['']/g, '"')
            // Remove any remaining markdown or formatting
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/_/g, '')
            // Fix unescaped quotes inside strings (improved regex)
            .replace(/"([^"]*)"([^":,\]}]*)"([^"]*)"(\s*[,:}\]])/g, function(match, p1, p2, p3, p4) {
                return '"' + p1 + p2.replace(/"/g, '') + p3 + '"' + p4;
            })
            // Fix missing quotes around keys
            .replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
            // Remove trailing commas
            .replace(/,(\s*[}\]])/g, '$1')
            // Fix multiple spaces
            .replace(/\s+/g, ' ')
            // Remove newlines and returns
            .replace(/[\n\r]/g, ' ')
            // Fix any remaining formatting issues
            .replace(/\s*:\s*/g, ':')
            .replace(/\s*,\s*/g, ',')
            .trim();
        
        // Try parsing with multiple approaches
        let parsedQuestions = null;
        
        // Approach 1: Direct parsing
        try {
            parsedQuestions = JSON.parse(jsonContent);
        } catch (e) {
            // Approach 2: Try to fix quotes more aggressively
            try {
                let fixedJson = jsonContent
                    // Find all string values and fix them
                    .replace(/"([^"]*(?:"[^"]*)*[^"]*)"/g, function(match, content) {
                        // Escape internal quotes
                        return '"' + content.replace(/"/g, '\\"') + '"';
                    });
                
                parsedQuestions = JSON.parse(fixedJson);
            } catch (e2) {
                // Approach 3: Manual extraction using regex
                try {
                    // Extract questions and answers separately
                    const questionMatches = jsonContent.match(/"question"\s*:\s*"([^"]+)"/g) || [];
                    const answerMatches = jsonContent.match(/"answer"\s*:\s*"([^"]+)"/g) || [];
                    
                    if (questionMatches.length === 0) {
                        throw new Error('No questions found in response');
                    }
                    
                    const questions = questionMatches.map(match => {
                        const result = match.match(/"question"\s*:\s*"([^"]+)"/);
                        return result ? result[1] : '';
                    });
                    
                    const answers = answerMatches.map(match => {
                        const result = match.match(/"answer"\s*:\s*"([^"]+)"/);
                        return result ? result[1] : '';
                    });
                    
                    // Pair questions with answers
                    parsedQuestions = questions.map((q, i) => ({
                        question: q || `Sample question ${i + 1}`,
                        answer: answers[i] || `Sample answer ${i + 1}`
                    }));
                    
                } catch (e3) {
                    // Emergency fallback questions
                    const fallbackQuestions = interviewType === 'technical' 
                        ? [
                            { question: `What technologies have you used in your ${jobExperience} years as a ${jobPosition}?`, answer: `I have ${jobExperience} years of experience working with ${jobDesc} and related technologies.` },
                            { question: `How do you approach problem-solving in ${jobPosition} role?`, answer: `I break down complex problems into smaller parts and use systematic approaches to find solutions.` },
                            { question: `Describe a challenging technical project you worked on`, answer: `I worked on a project involving ${jobDesc} where I had to overcome technical challenges and deliver results.` },
                            { question: `How do you stay updated with new technologies?`, answer: `I regularly read documentation, attend webinars, and practice with new tools to stay current.` },
                            { question: `What is your experience with ${jobDesc}?`, answer: `I have hands-on experience with ${jobDesc} and have used it in multiple projects during my career.` }
                        ]
                        : [
                            { question: `Tell me about a challenging situation you faced as a ${jobPosition}`, answer: `I encountered a challenging deadline where I had to prioritize tasks and communicate effectively with my team to deliver on time.` },
                            { question: `How do you handle conflicts in a team environment?`, answer: `I listen to all perspectives, facilitate open communication, and work towards finding mutually beneficial solutions.` },
                            { question: `Describe a time when you had to learn something new quickly`, answer: `I had to quickly adapt to new processes and technologies, which I approached through focused learning and practice.` },
                            { question: `How do you manage stress and tight deadlines?`, answer: `I prioritize tasks, break them into manageable steps, and maintain clear communication with stakeholders.` },
                            { question: `Tell me about a time you showed leadership`, answer: `I took initiative in guiding team members, making decisions, and ensuring project goals were met effectively.` }
                        ];
                    
                    parsedQuestions = fallbackQuestions.slice(0, parseInt(questionCount));
                }
            }
        }
        
        // Validate and clean the results
        if (!Array.isArray(parsedQuestions)) {
            parsedQuestions = [parsedQuestions];
        }
        
        if (parsedQuestions.length === 0) {
            throw new Error('No questions were extracted from AI response');
        }
        
        // Clean and validate each question
        const validQuestions = parsedQuestions
            .filter(item => item && typeof item === 'object')
            .map((item, index) => {
                let question = String(item.question || item.Question || '').trim();
                let answer = String(item.answer || item.Answer || '').trim();
                
                // Provide defaults if missing
                if (!question || question.length < 5) {
                    question = interviewType === 'technical' 
                        ? `What is your experience with ${jobDesc}?`
                        : `Tell me about a challenging situation you faced as a ${jobPosition}`;
                }
                
                if (!answer || answer.length < 10) {
                    answer = interviewType === 'technical'
                        ? `Based on my ${jobExperience} years of experience with ${jobDesc}, I have worked on various projects and gained expertise in relevant technologies.`
                        : `In my ${jobExperience} years as a ${jobPosition}, I faced a challenging situation where I had to use problem-solving skills to achieve successful results.`;
                }
                
                return {
                    question: question,
                    answer: answer
                };
            })
            .slice(0, parseInt(questionCount)); // Ensure we have the right number
        
        // Ensure we have at least some questions
        if (validQuestions.length === 0) {
            throw new Error('No valid questions could be extracted or generated');
        }
        

        return JSON.stringify(validQuestions);
        
    } catch (error) {
        console.error(`Attempt ${retryCount + 1} failed:`, error.message);
        
        if (retryCount < maxRetries) {

            await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
            return generateAIQuestions(jobPosition, jobDesc, jobExperience, interviewType, retryCount + 1);
        } else {
            throw new Error(`Failed to generate AI questions after ${maxRetries + 1} attempts. Last error: ${error.message}`);
        }
    }
}

function AddNewInterview() {
    const [openDialog,setOpenDialog]=useState(false)
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [interviewType, setInterviewType] = useState('technical'); // New state for interview type
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router= useRouter();
    const {user} = useUser();    const onSubmit=async(e)=>{
        setLoading(true);
        e.preventDefault();

        
        try {
            // Use the enhanced AI question generator

            const MockJsonResp = await generateAIQuestions(jobPosition, jobDesc, jobExperience, interviewType);
            

            setJsonResponse(MockJsonResp);

            if(MockJsonResp){
                const mockId = uuidv4();
                const mockInterviewData = {
                    mockId: mockId,
                    jsonMockResp: MockJsonResp,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    interviewType: interviewType, // Add interview type to saved data
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
                };


                const resp = await createMockInterview(mockInterviewData);


                if(resp){
                    setOpenDialog(false);
                    router.push('/dashboard/interview/' + mockId);
                }
            } else {
                throw new Error('Failed to generate interview questions');
            }
        } catch (error) {
            console.error("Error in onSubmit:", error);
            alert(`Error creating interview: ${error.message}\n\nPlease try again. If the problem persists, check your internet connection and Gemini AI API key.`);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <div className='group relative p-8 border-2 border-dashed border-gray-300 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all duration-300 hover:scale-102' onClick={()=>setOpenDialog(true)}>
                <div className='text-center'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300'>
                        <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                        </svg>
                    </div>
                    <h2 className='text-xl font-semibold text-gray-900 mb-2'>Create New Interview</h2>
                    <p className='text-gray-600'>Start practicing with AI-generated questions</p>
                </div>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create Your Mock Interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit} className="space-y-6">
                            <div className="space-y-6">
                                <p className="text-gray-600">Tell us about your target role and experience to get personalized interview questions.</p>
                                
                                <div className='space-y-2'>
                                    <label className="text-sm font-medium text-gray-700">Job Role/Position</label>
                                    <Input 
                                        placeholder="e.g. Frontend Developer, Data Scientist, Product Manager" 
                                        required 
                                        onChange={(event)=>setJobPosition(event.target.value)}
                                        className="border-2 focus:border-blue-400"
                                    />
                                </div>
                                
                                <div className='space-y-2'>
                                    <label className="text-sm font-medium text-gray-700">Job Description/Tech Stack</label>
                                    <Textarea 
                                        placeholder="e.g. React, Node.js, TypeScript, MongoDB, REST APIs, Agile methodologies..." 
                                        required 
                                        onChange={(event)=>setJobDesc(event.target.value)}
                                        className="border-2 focus:border-blue-400 min-h-[100px]"
                                    />
                                </div>
                                
                                <div className='space-y-2'>
                                    <label className="text-sm font-medium text-gray-700">Years of Experience</label>
                                    <Input 
                                        placeholder="e.g. 2" 
                                        type="number" 
                                        min="0"
                                        max="50" 
                                        required 
                                        onChange={(event)=>setJobExperience(event.target.value)}
                                        className="border-2 focus:border-blue-400"
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <label className="text-sm font-medium text-gray-700">Interview Type</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div 
                                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                interviewType === 'technical' 
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            onClick={() => setInterviewType('technical')}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <input 
                                                    type="radio" 
                                                    value="technical" 
                                                    checked={interviewType === 'technical'}
                                                    onChange={() => setInterviewType('technical')}
                                                    className="text-blue-600"
                                                />
                                                <div>
                                                    <div className="font-medium">Technical</div>
                                                    <div className="text-xs text-gray-500">Coding, system design, tech concepts</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div 
                                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                interviewType === 'behavioral' 
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            onClick={() => setInterviewType('behavioral')}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <input 
                                                    type="radio" 
                                                    value="behavioral" 
                                                    checked={interviewType === 'behavioral'}
                                                    onChange={() => setInterviewType('behavioral')}
                                                    className="text-blue-600"
                                                />
                                                <div>
                                                    <div className="font-medium">Behavioral</div>
                                                    <div className="text-xs text-gray-500">Past experiences, soft skills</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='flex gap-4 justify-end pt-4'>
                                <Button type="button" variant="outline" onClick={()=>setOpenDialog(false)} className="px-6">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <LoaderCircle className='animate-spin w-4 h-4'/>
                                            <span>Generating Questions...</span>
                                        </div>
                                    ) : (
                                        'Start Interview'
                                    )}
                                </Button>
                            </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview
