'use client'
import React from 'react'
import {  Menu, Search, X, Filter,Mail } from "lucide-react";
import { Input } from "inbox-ui";
import useSlideBar from '../../lib/hooks/useSlideBar'
import UserProfileIcon from '../../components/ui/userProfile'
import  usegetUserInfo from '../../lib/hooks/usegetUserInfo'
export default function Header() {
  const {value,call_SlideBar_Dispatch}=useSlideBar()
  const user=usegetUserInfo()

  return (
   <div className="flex items-center  w-full gap-3 p-2  border-b sticky bg-white top-0 z-46">

  <div className='w-fit  self-start mb-4'>
 <div className="flex gap-x-2 items-center ml-2 mt-2 w-full px-4 ">
<div onClick={()=>{call_SlideBar_Dispatch()}} className='w-fit p-2 rounded-full hover:bg-black/10'>
<Menu className=" h-5 w-5  text-black/75 " />  

</div>  
<div className='flex items-center '>
<Mail className=" mr-2 w-6 h-6 font-bold text-blue-900 "/>
 <h1 className="text-black font-bold text-xl">Inbox</h1>
</div> 
</div> 
 </div>
   <div className=" flex max-w-xl self-center mx-auto items-center justify-between bg-gray-200 rounded-4xl px-4 py-1 space-x-2 flex-1 shadow-sm">
     <div className='flex flex-1 items-center   gap-x-1'>
    <Search className="h-5 w-5 text-gray-500" />
<Input placeholder="Search mail" className="border-none w-full focus:outline-0 text-black/75 shadow-none bg-transparent 
 focus-visible:ring-0" />
     </div>
    <div className='flex  gap-x-1 w-fit ml-auto'>
    <X className="h-4 w-4 text-gray-500" />
    <Filter className="h-4 w-4 text-gray-500 ml-2" />
    </div>
   </div>
   <UserProfileIcon
   user={user}
   />
 </div>
  )
}
