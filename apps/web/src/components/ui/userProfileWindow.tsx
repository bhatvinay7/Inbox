import React from 'react'
import {Button} from 'inbox-ui'
import {X} from 'lucide-react'
import useProfile from '../../lib/hooks/useProfile';
import  usegetUserInfo from '../../lib/hooks/usegetUserInfo'
export default function Profile() {
   const {callDispatch}=useProfile()
   const user=usegetUserInfo()
return (
<div className="w-80 fixed right-2 top-20 bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center space-y-4 z-45">
<div className='absolute right-2 cursor-pointer top-2'>
<X onClick={()=>{callDispatch()}}className="w-5 h-5 text-black/75"/>    
</div>    
<p className="text-sm text-gray-700 font-medium">{user.email}</p>

<div className="relative">
<div className="h-20 w-20 rounded-full bg-green-600 flex items-center justify-center text-white text-3xl font-semibold">{`${user?.username && user?.uername?.split(" ")?.[0] ? user.uername?.split(" ")?.[0]?.charAt[0]?.toUpperCase():""}`}</div>
<div className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-white shadow flex items-center justify-center">
</div>
</div>
<p className="text-xl font-semibold text-gray-800">{`Hi, ${user?.username && user?.uername?.split(" ")?.[0] ? user?.uername?.split(" ")?.[0]:user?.username ? user?.username :""}`}</p>
{user?.isVerified ?
<Button className=" text-white cursor-pointer text-[12px] rounded-3xl bg-red-500/60 sm:w-[60%] w-full px-2 py-1.5">Logout</Button>:<></> }
</div>
)
}