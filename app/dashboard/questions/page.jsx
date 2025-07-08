"use client"
import React, { useState } from 'react'
import { Search, Filter, Lock, Play, BookOpen, Star, Clock, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

const QuestionBank = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [expandedAnswers, setExpandedAnswers] = useState({})
  const { user } = useUser()
  
  // Check if user is Pro
  const isPro = user?.publicMetadata?.subscription === 'pro'

  const toggleAnswer = (questionId) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }))
  }

  const formatAnswer = (answer) => {
    // First, split by numbered points (1), 2), 3), etc.)
    const parts = answer.split(/(\d+\)\s*)/g)
    let formatted = []
    let currentIndex = 0

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim()
      
      if (/^\d+\)\s*$/.test(part)) {
        // This is a number like "1) "
        const nextPart = parts[i + 1] ? parts[i + 1].trim() : ''
        if (nextPart) {
          formatted.push(
            <div key={currentIndex} className="mb-3 pl-0">
              <span className="font-semibold text-blue-900 mr-2">{part}</span>
              <span className="leading-relaxed">{nextPart}</span>
            </div>
          )
          i++ // Skip the next part since we've already used it
          currentIndex++
        }
      } else if (part && !parts[i - 1]?.match(/^\d+\)\s*$/)) {
        // This is regular text that's not part of a numbered list
        // Split by sentences for better readability
        const sentences = part.split(/\.\s+/).filter(s => s.trim())
        sentences.forEach((sentence, sentenceIndex) => {
          if (sentence.trim()) {
            formatted.push(
              <div key={`${currentIndex}-${sentenceIndex}`} className="mb-2 leading-relaxed">
                {sentence.trim()}{sentenceIndex < sentences.length - 1 ? '.' : sentence.endsWith('.') ? '' : '.'}
              </div>
            )
          }
        })
        currentIndex++
      }
    }

    // If no numbered points were found, just format as paragraphs
    if (formatted.length === 0) {
      const sentences = answer.split(/\.\s+/).filter(s => s.trim())
      formatted = sentences.map((sentence, index) => (
        <div key={index} className="mb-2 leading-relaxed">
          {sentence.trim()}{index < sentences.length - 1 ? '.' : sentence.endsWith('.') ? '' : '.'}
        </div>
      ))
    }

    return formatted
  }

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpen },
    { id: 'frontend', name: 'Frontend', icon: '🎨' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'fullstack', name: 'Full Stack', icon: '🔄' },
    { id: 'behavioral', name: 'Behavioral', icon: '🧠' },
    { id: 'system-design', name: 'System Design', icon: '🏗️' },
    { id: 'algorithms', name: 'Algorithms', icon: '📊' }
  ]

  const difficulties = [
    { id: 'all', name: 'All Levels', color: 'gray' },
    { id: 'beginner', name: 'Beginner', color: 'green' },
    { id: 'intermediate', name: 'Intermediate', color: 'yellow' },
    { id: 'advanced', name: 'Advanced', color: 'red' }
  ]

  const questions = [
    // FREE QUESTIONS (Available to all users)
    {
      id: 1,
      question: "What is React and what are its key features?",
      answer: "React is a JavaScript library for building user interfaces, particularly web applications. Key features include: 1) Virtual DOM for efficient updates, 2) Component-based architecture for reusability, 3) JSX syntax for writing HTML-like code in JavaScript, 4) One-way data binding for predictable data flow, 5) Hooks for state management in functional components, 6) Strong ecosystem and community support.",
      category: 'frontend',
      difficulty: 'beginner',
      isPro: false,
      estimatedTime: '3-5 min',
      tags: ['React', 'JavaScript', 'Frontend'],
      company: 'Google'
    },
    {
      id: 2,
      question: "Explain the difference between var, let, and const in JavaScript.",
      answer: "var: Function-scoped, can be redeclared and updated, hoisted with undefined value. let: Block-scoped, can be updated but not redeclared in same scope, hoisted but not initialized. const: Block-scoped, cannot be updated or redeclared, must be initialized at declaration, hoisted but not initialized. Best practice: use const by default, let when you need to reassign, avoid var.",
      category: 'frontend',
      difficulty: 'beginner',
      isPro: false,
      estimatedTime: '2-3 min',
      tags: ['JavaScript', 'Variables', 'ES6'],
      company: 'Microsoft'
    },
    {
      id: 3,
      question: "What is RESTful API and what are its principles?",
      answer: "REST (Representational State Transfer) is an architectural style for designing web services. Key principles: 1) Stateless - each request contains all necessary information, 2) Client-Server architecture, 3) Cacheable responses, 4) Uniform interface using HTTP methods (GET, POST, PUT, DELETE), 5) Layered system architecture, 6) Resource-based URLs with proper status codes.",
      category: 'backend',
      difficulty: 'intermediate',
      isPro: false,
      estimatedTime: '4-6 min',
      tags: ['API', 'REST', 'Backend'],
      company: 'Amazon'
    },
    {
      id: 4,
      question: "Tell me about a challenging project you worked on.",
      answer: "I worked on a real-time chat application with 10,000+ concurrent users. Challenges included: 1) Scaling WebSocket connections, 2) Message delivery guarantees, 3) Database optimization for message history. Solution: Implemented Redis for session management, MongoDB for message storage, and Socket.io with clustering. Result: Achieved 99.9% uptime and reduced latency by 40%.",
      category: 'behavioral',
      difficulty: 'intermediate',
      isPro: false,
      estimatedTime: '5-7 min',
      tags: ['Experience', 'Problem Solving', 'Leadership'],
      company: 'Facebook'
    },
    {
      id: 5,
      question: "What is the difference between SQL and NoSQL databases?",
      answer: "SQL databases: Structured data with fixed schema, ACID compliance, vertical scaling, complex queries with joins, examples: MySQL, PostgreSQL. NoSQL databases: Flexible schema, horizontal scaling, eventual consistency, document/key-value/graph storage, examples: MongoDB, Redis, Cassandra. Choose SQL for complex relationships and transactions, NoSQL for scalability and flexible data models.",
      category: 'backend',
      difficulty: 'beginner',
      isPro: false,
      estimatedTime: '3-4 min',
      tags: ['Database', 'SQL', 'NoSQL'],
      company: 'Netflix'
    },
    {
      id: 6,
      question: "What is the event loop in JavaScript?",
      answer: "The event loop is JavaScript's concurrency model that handles asynchronous operations. It continuously checks the call stack and task queue. When the call stack is empty, it moves tasks from the queue to the stack. This allows non-blocking execution of code, enabling JavaScript to handle multiple operations simultaneously despite being single-threaded.",
      category: 'frontend',
      difficulty: 'intermediate',
      isPro: false,
      estimatedTime: '4-6 min',
      tags: ['JavaScript', 'Async', 'Event Loop'],
      company: 'Google'
    },
    {
      id: 7,
      question: "Explain the concept of closures in JavaScript.",
      answer: "A closure is a function that has access to variables in its outer lexical scope even after the outer function has returned. Closures are created when a function is defined inside another function. They're useful for data privacy, creating factory functions, and implementing module patterns. Example: function outer(x) { return function(y) { return x + y; }; }",
      category: 'frontend',
      difficulty: 'intermediate',
      isPro: false,
      estimatedTime: '3-5 min',
      tags: ['JavaScript', 'Closures', 'Scope'],
      company: 'Meta'
    },
    {
      id: 8,
      question: "What is the difference between authentication and authorization?",
      answer: "Authentication verifies 'who you are' - confirming user identity through credentials like passwords, tokens, or biometrics. Authorization determines 'what you can do' - granting or denying access to specific resources based on permissions. Authentication happens first, then authorization. Example: logging in (auth) vs accessing admin panel (authz).",
      category: 'backend',
      difficulty: 'beginner',
      isPro: false,
      estimatedTime: '3-4 min',
      tags: ['Security', 'Auth', 'Backend'],
      company: 'Amazon'
    },
    {
      id: 9,
      question: "Describe the differences between HTTP and HTTPS.",
      answer: "HTTP (HyperText Transfer Protocol) transmits data in plain text, making it vulnerable to interception. HTTPS (HTTP Secure) adds SSL/TLS encryption, ensuring data confidentiality and integrity. HTTPS uses port 443 vs HTTP's port 80, requires SSL certificates, and provides authentication of the server. Modern browsers mark HTTP sites as 'not secure'.",
      category: 'backend',
      difficulty: 'beginner',
      isPro: false,
      estimatedTime: '3-4 min',
      tags: ['HTTP', 'Security', 'Web'],
      company: 'Microsoft'
    },
    {
      id: 10,
      question: "What are the main principles of Object-Oriented Programming?",
      answer: "The four main OOP principles are: 1) Encapsulation - bundling data and methods, hiding internal details, 2) Inheritance - creating new classes based on existing ones, 3) Polymorphism - same interface for different underlying forms, 4) Abstraction - hiding complex implementation details. These principles promote code reusability, maintainability, and modularity.",
      category: 'backend',
      difficulty: 'beginner',
      isPro: false,
      estimatedTime: '4-6 min',
      tags: ['OOP', 'Programming', 'Concepts'],
      company: 'Apple'
    },
    {
      id: 11,
      question: "Explain the concept of promises in JavaScript.",
      answer: "Promises represent eventual completion or failure of asynchronous operations. They have three states: pending, fulfilled, or rejected. Promises provide .then() for success, .catch() for errors, and .finally() for cleanup. They solve callback hell and enable better error handling. Can be chained and used with async/await for cleaner syntax.",
      category: 'frontend',
      difficulty: 'intermediate',
      isPro: false,
      estimatedTime: '4-6 min',
      tags: ['JavaScript', 'Promises', 'Async'],
      company: 'Netflix'
    },
    {
      id: 12,
      question: "What is the purpose of CSS Grid vs Flexbox?",
      answer: "CSS Grid is designed for two-dimensional layouts (rows and columns), ideal for complex page layouts. Flexbox is for one-dimensional layouts (either row or column), perfect for component-level design. Grid: explicit placement, overlapping items, complex layouts. Flexbox: content-based sizing, alignment, distributing space. Often used together in modern layouts.",
      category: 'frontend',
      difficulty: 'intermediate',
      isPro: false,
      estimatedTime: '4-5 min',
      tags: ['CSS', 'Layout', 'Grid', 'Flexbox'],
      company: 'Google'
    },
    {
      id: 13,
      question: "Describe how you would handle conflicts in a team project.",
      answer: "1) Listen actively to all perspectives without judgment, 2) Identify the root cause of conflict, 3) Focus on facts and project goals rather than personalities, 4) Facilitate open discussion to find common ground, 5) Propose compromise solutions that benefit the project, 6) Document agreements and next steps, 7) Follow up to ensure resolution, 8) Learn from the experience to prevent similar conflicts.",
      category: 'behavioral',
      difficulty: 'intermediate',
      isPro: false,
      estimatedTime: '5-7 min',
      tags: ['Teamwork', 'Conflict Resolution', 'Communication'],
      company: 'Meta'
    },
    {
      id: 14,
      question: "What motivates you in your work?",
      answer: "I'm motivated by solving complex problems that have real impact on users. I enjoy learning new technologies and applying them to create efficient solutions. Collaborating with talented teammates and mentoring others also drives me. Seeing a project succeed and knowing my code helps thousands of users daily gives me deep satisfaction. Continuous growth and technical challenges keep me engaged.",
      category: 'behavioral',
      difficulty: 'beginner',
      isPro: false,
      estimatedTime: '3-5 min',
      tags: ['Motivation', 'Career', 'Personal'],
      company: 'Amazon'
    },
    {
      id: 15,
      question: "How do you stay updated with technology trends?",
      answer: "I follow tech blogs like TechCrunch and Hacker News, subscribe to newsletters from companies like GitHub and Stack Overflow. I participate in developer communities, attend conferences and webinars, contribute to open source projects, and experiment with new technologies in side projects. I also follow thought leaders on Twitter and LinkedIn for industry insights.",
      category: 'behavioral',
      difficulty: 'beginner',
      isPro: false,
      estimatedTime: '4-6 min',
      tags: ['Learning', 'Technology', 'Growth'],
      company: 'Google'
    },

    // PRO QUESTIONS (Limited for Pro users, locked for free users)
    {
      id: 16,
      question: "Design a distributed key-value store like DynamoDB",
      answer: "Key components: 1) Consistent hashing for data distribution, 2) Vector clocks for conflict resolution, 3) Gossip protocol for failure detection, 4) Quorum-based reads/writes, 5) Anti-entropy for replica synchronization, 6) Merkle trees for efficient comparison, 7) Hinted handoff for temporary failures, 8) Configurable consistency levels.",
      category: 'system-design',
      difficulty: 'advanced',
      isPro: true,
      estimatedTime: '30-40 min',
      tags: ['Distributed Systems', 'Database', 'NoSQL'],
      company: 'Amazon'
    },
    {
      id: 17,
      question: "Explain how you would optimize a slow database query",
      answer: "1) Analyze query execution plan, 2) Add appropriate indexes (B-tree, hash, partial), 3) Optimize WHERE clauses and JOIN conditions, 4) Consider query rewriting and subquery optimization, 5) Implement pagination for large result sets, 6) Use database-specific optimizations, 7) Consider caching strategies, 8) Monitor and profile regularly, 9) Denormalization when appropriate.",
      category: 'backend',
      difficulty: 'advanced',
      isPro: true,
      estimatedTime: '10-15 min',
      tags: ['Database', 'Performance', 'SQL'],
      company: 'Google'
    },
    {
      id: 18,
      question: "Design a real-time analytics system for tracking user behavior",
      answer: "Architecture: 1) Event streaming with Kafka/Kinesis, 2) Lambda architecture (batch + stream processing), 3) Time-series databases (InfluxDB), 4) Data warehousing (Snowflake/BigQuery), 5) Real-time dashboards, 6) Event schema design, 7) Data partitioning strategies, 8) Approximate algorithms for large-scale counting, 9) Privacy and GDPR compliance.",
      category: 'system-design',
      difficulty: 'advanced',
      isPro: true,
      estimatedTime: '20-30 min',
      tags: ['Analytics', 'Real-time', 'Big Data'],
      company: 'Netflix'
    }
  ]

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // For Pro users, limit the Pro questions to only 2-3 questions
  const displayedQuestions = isPro 
    ? filteredQuestions.map((q, index) => {
        if (q.isPro && index >= 2) {
          // Show only first 2 pro questions, mark rest as locked
          return { ...q, isPro: true, isLocked: true }
        }
        return q
      })
    : filteredQuestions

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50 border-green-200'
      case 'intermediate': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'advanced': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getCategoryEmoji = (category) => {
    const cat = categories.find(c => c.id === category)
    return cat?.icon || '📝'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Question Bank
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Practice with curated interview questions from top tech companies
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search questions, tags, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-400"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
            >
              {difficulties.map(diff => (
                <option key={diff.id} value={diff.id}>{diff.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {displayedQuestions.map((question) => (
            <div
              key={question.id}
              className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                (question.isPro && !isPro) || question.isLocked ? 'opacity-75' : ''
              }`}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCategoryEmoji(question.category)}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {(question.isPro || question.isLocked) && (
                      <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                        <Lock className="w-3 h-3" />
                        Pro
                      </div>
                    )}
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {question.company}
                    </div>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-3 leading-relaxed">
                  {question.question}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {question.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {question.category}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {((question.isPro && !isPro) || question.isLocked) ? (
                  <div className="text-center py-8">
                    <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">
                      {question.isLocked 
                        ? "Upgrade to unlock more premium questions" 
                        : "This question is available for Pro members only"
                      }
                    </p>
                    <Link href="/upgrade">
                      <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                        <Trophy className="w-4 h-4 mr-2" />
                        Upgrade to Pro
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
                      <h4 className="font-medium text-blue-900 mb-3">Sample Answer:</h4>
                      <div className="text-blue-800 text-sm leading-relaxed">
                        {expandedAnswers[question.id] ? (
                          <div className="space-y-1">
                            {formatAnswer(question.answer)}
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {(() => {
                              // Smart truncation - try to cut at sentence end
                              const truncateLength = 200
                              if (question.answer.length <= truncateLength) {
                                return formatAnswer(question.answer)
                              }
                              
                              let truncated = question.answer.substring(0, truncateLength)
                              const lastSentenceEnd = truncated.lastIndexOf('. ')
                              const lastColonEnd = truncated.lastIndexOf(': ')
                              
                              if (lastSentenceEnd > truncateLength * 0.6) {
                                truncated = question.answer.substring(0, lastSentenceEnd + 1)
                              } else if (lastColonEnd > truncateLength * 0.6) {
                                truncated = question.answer.substring(0, lastColonEnd + 1)
                              } else {
                                truncated = truncated + '...'
                              }
                              
                              return formatAnswer(truncated)
                            })()}
                          </div>
                        )}
                        {question.answer.length > 200 && (
                          <button
                            onClick={() => toggleAnswer(question.id)}
                            className="mt-3 text-blue-600 hover:text-blue-800 font-medium text-xs underline transition-colors duration-200 hover:no-underline"
                          >
                            {expandedAnswers[question.id] ? 'Read Less' : 'Read More'}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {question.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {displayedQuestions.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* CTA for more questions */}
        {!isPro && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 p-8">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Want More Questions?</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Unlock additional premium questions from top companies like Google, Amazon, and more.
              </p>
              <Link href="/upgrade">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 text-lg">
                  <Trophy className="w-5 h-5 mr-2" />
                  Upgrade to Pro
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionBank
