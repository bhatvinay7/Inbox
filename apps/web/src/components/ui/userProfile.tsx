import React from "react";
import { HelpCircle, Settings, Sparkles, Grid3x3 } from "lucide-react";
import useProfile from "../../lib/hooks/useProfile";
import {userCredentials} from 'types'
export default function UserProfileIcon({user}:{user: userCredentials}) {
  const {value,callDispatch}=useProfile()
  return (
    <div className="flex ml-auto right-2 items-center  gap-4 mr-4">
      <Settings className="h-5 w-5 text-gray-600 cursor-pointer" />
    
      
      <div onClick={()=>{callDispatch()}} className={`${value ?"ring-offset-1 ring-3 ring-green-900/30":"ring-0"} h-9 w-9 rounded-full bg-green-600 flex items-center justify-center text-white font-medium cursor-pointer`}>{`${user?.username && user?.uername?.split(" ")?.[0] ? user.uername?.split(" ")?.[0]?.charAt[0]?.toUpperCase():""}`}</div>
    </div>
  );
}

/* <HelpCircle className="h-5 w-5 text-gray-600 cursor-pointer" /> */
/* <Sparkles className="h-5 w-5 text-gray-600 cursor-pointer" /> */
/* <Grid3x3 className="h-5 w-5 text-gray-600 cursor-pointer" /> */