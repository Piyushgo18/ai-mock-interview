"use client"
import React from 'react'
import Header from './_components/Header'
import Sidebar from './_components/Sidebar'
import { usePathname } from 'next/navigation'

function Dashboardlayout({ children }) {
  const pathname = usePathname()
  
  // Only show sidebar on main dashboard page
  const showSidebar = pathname === '/dashboard'
  
  return (
    <div className="min-h-screen bg-gray-50">
      {showSidebar ? (
        <>
          <Header/>
          <Sidebar />
          <div className="lg:ml-64 transition-all duration-300 pt-20">
            <div className="p-6">
              {children}
            </div>
          </div>
        </>
      ) : (
        <div>
          <Header/>
          <div className='mx-5 md:mx-20 lg:mx-36 pt-20'>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboardlayout
