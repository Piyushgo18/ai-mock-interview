import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Calendar, Briefcase, User, ArrowRight, BarChart3, Brain, Users } from 'lucide-react'

function InterviewItemCard({ interview }) {
    const router=useRouter();
    
    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId);
    }
    
    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+'/feedback');
    }

    // Format date to DD-MM-YYYY
    const formatDate = (dateString) => {
        try {
            let date;
            
            if (dateString.includes('T')) {
                // ISO string format: "2025-01-07T12:34:56.789Z"
                date = new Date(dateString);
            } else if (dateString.includes('-') && dateString.length === 10) {
                // Already in DD-MM-YYYY format: "07-01-2025"
                return dateString;
            } else {
                // Fallback: try to parse as-is
                date = new Date(dateString);
            }
            
            // Convert to DD-MM-YYYY format
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            
            return `${day}-${month}-${year}`;
        } catch (error) {
            console.error('Error formatting date:', dateString, error);
            return dateString; // Return original if formatting fails
        }
    }

  return (
    <div className='group bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:scale-102'>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className='font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>{interview?.jobPosition}</h2>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <User className="w-4 h-4 mr-2 text-gray-400" />
              <span>{interview?.jobExperience} Years Experience</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>Created at: {formatDate(interview.createdAt)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              {interview?.interviewType === 'behavioral' ? (
                <Users className="w-4 h-4 mr-2 text-gray-400" />
              ) : (
                <Brain className="w-4 h-4 mr-2 text-gray-400" />
              )}
              <span className="capitalize">
                {interview?.interviewType || 'Technical'} Interview
              </span>
            </div>
          </div>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
          <Briefcase className="w-5 h-5 text-blue-600" />
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Job Description</div>
        <p className="text-sm text-gray-700 line-clamp-2">{interview?.jobDesc || 'No description available'}</p>
      </div>
      
      <div className='flex gap-3 mt-4'>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300" 
          onClick={onFeedbackPress}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Feedback
        </Button>
        <Button 
          size="sm" 
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" 
          onClick={onStart}
        >
          Start
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default InterviewItemCard
