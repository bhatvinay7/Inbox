'use client'
import React from 'react'
import useSlideBar from '../../lib/hooks/useSlideBar'
import Sidebar from "./sidebar";
import Compose from '../ui/compose'
export default function LayoutController({children}:{children:React.ReactNode}) {
  const {value,call_SlideBar_Dispatch}=useSlideBar() as string
  return (
   <div className={`w-full relative grid grid-cols-1 bg-white ${value ? "sm:grid-cols-[150px_1fr] md:grid-cols-[280px_1fr]":"sm:grid-cols-[80px_1fr]" } `}>
    <div className="w-full relative h-screen bg-blue-50/60 ">
    <Sidebar/>   
    </div>    
      {children}
    <Compose/>  
   </div>
   
  )
}
