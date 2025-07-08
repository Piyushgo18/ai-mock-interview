# 🧠 AI MockPrep - Intelligent Interview Preparation Platform

<div align="center">

**Master Your Interview Skills with AI-Powered Mock Interviews**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11.10.0-orange)](https://firebase.google.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6.22.0-purple)](https://clerk.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue)](https://tailwindcss.com/)


</div>

## 🌟 Overview

AI MockPrep is a cutting-edge interview preparation platform that leverages the power of artificial intelligence to provide personalized mock interview experiences. Built with modern web technologies, it offers real-time AI feedback, comprehensive analytics, and a vast question bank to help job seekers ace their interviews.

## ✨ Features

### 🎯 **AI-Powered Mock Interviews**
- **Real-time AI Feedback**: Instant evaluation using Google's Gemini AI with contextual follow-up questions
- **Webcam & Voice Recording**: Practice with video/audio recording and speech-to-text integration
- **Custom Job Positions**: Tailored interviews for specific roles and companies

### 📊 **Analytics & Performance Tracking**
- **Comprehensive Dashboard**: Monitor progress with detailed metrics and trend analysis
- **Skill Assessment**: Identify strengths/weaknesses with performance scoring
- **Interview History**: Review past sessions and track improvement over time

### 💼 **Question Bank (25+ Questions)**
- **Multiple Categories**: Frontend, Backend, System Design, Behavioral, Algorithms
- **Difficulty Levels**: Beginner to Advanced with smart filtering
- **Interactive Format**: Expandable answers with "Read More" functionality

### 🔐 **User Management & Payments**
- **Secure Authentication**: Clerk integration with social login options
- **Flexible Pricing**: Free tier + Pro subscription with Razorpay payment processing
- **Data Privacy**: Secure Firebase Firestore storage

## 🛠️ Tech Stack

**Frontend:** Next.js 15.3.3, React 19, Tailwind CSS 4, Shadcn/ui, Lucide React

**Backend:** Firebase Firestore, Google Gemini AI, Clerk Authentication, Razorpay

**Additional:** React Webcam, Speech-to-Text, Jest Testing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project
- Clerk account
- Google AI Studio API key
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Piyushgo18/ai-mock-interview.git
   cd ai-mock-interview
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Google AI Studio
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

   # Razorpay (for payments)
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

4. **Firebase Setup**
   
   Set up Firestore security rules (for development):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Application Structure

```
ai-mock-interview/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── dashboard/                # Main dashboard
│   │   ├── _components/          # Dashboard components
│   │   ├── interview/            # Interview flow
│   │   ├── questions/            # Question bank
│   │   └── analytics/            # Analytics page
│   ├── api/                      # API routes
│   └── globals.css               # Global styles
├── components/                   # Reusable UI components
│   └── ui/                       # Shadcn/ui components
├── utils/                        # Utility functions
│   ├── firebase.js               # Firebase configuration
│   ├── firebaseOperations.js     # Database operations
│   └── GeminiAIModal.js          # AI integration
├── public/                       # Static assets
└── __tests__/                    # Test files
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```



## 👨‍💻 Author

**Piyush Goyal**
- GitHub: [@Piyushgo18](https://github.com/Piyushgo18)
- LinkedIn: [Piyush Goyal](https://www.linkedin.com/in/piyush-goyal-b57027299/)


## 📄 Copyright

© 2025 Piyush Goyal. All rights reserved.


---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

Made with ❤️ by [Piyush Goyal](https://github.com/Piyushgo18)

</div>