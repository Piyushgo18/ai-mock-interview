"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { Brain, Crown } from 'lucide-react'
import { getUserSubscription } from '../../../utils/firebaseOperations'

function Header() {
    const path = usePathname();
    const router = useRouter();
    const { user } = useUser();
    const [userSubscription, setUserSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {

    }, [])

    useEffect(() => {
        const fetchUserSubscription = async () => {
            if (user?.id) {
                try {
                    const subscription = await getUserSubscription(user.id);
                    setUserSubscription(subscription);
                } catch (error) {
                    console.error('Error fetching user subscription:', error);
                    // Default to free plan on error
                    setUserSubscription({ plan: 'free' });
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserSubscription();
    }, [user?.id]);

    const handleNavigation = (route) => {
        router.push(route);
    }

  return (
    <div className='fixed top-0 left-0 right-0 z-50 flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <div className='flex items-center gap-2'>
        <Brain className="h-8 w-8 text-blue-400" />
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI MockPrep
        </span>
        {!loading && userSubscription?.plan === 'pro' && (
          <div className="relative group">
            <Crown className="h-6 w-6 text-yellow-500 ml-1 animate-pulse" />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Pro Member
            </div>
          </div>
        )}
      </div>
      <ul className='hidden md:flex gap-6'>
        <li 
          onClick={() => handleNavigation('/dashboard')}
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && 'text-primary font-bold'}`}
        >
          Dashboard
        </li>
        <li 
          onClick={() => handleNavigation('/contact')}
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/contact' && 'text-primary font-bold'}`}
        >
          Contact Us
        </li>
        <li 
          onClick={() => handleNavigation('/upgrade')}
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/upgrade' && 'text-primary font-bold'}`}
        >
          Upgrade
        </li>
        <li 
          onClick={() => handleNavigation('/about')}
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/about' && 'text-primary font-bold'}`}
        >
          About
        </li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
