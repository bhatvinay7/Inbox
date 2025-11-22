import React from 'react'
import {Button} from 'inbox-ui'
import { Mail, Star, Inbox, Send, File, Menu, Search, X, Filter,Pen } from "lucide-react";
export default function Sidebar() {
  return (
<aside className="w-full bg-blue-50/75 sticky top-18 h-auto hidden md:flex flex-col space-y-2">
  <div className='flex items-start justify-center mt-4 px-4'>
      <Button className="w-full text-black/75 bg-blue-400/35 hover:bg-blue-400/20 rounded-3xl justify-start flex " variant="default">
  <Pen className="mr-2 h-5 w-5 text-black" /> Compose
</Button>
  </div>
  <div className=' h-full w-full'>

  <nav className="flex flex-col text-black/75 justify-center p-4 space-y-2">
    <Button variant="link" className="justify-start flex hover:bg-blue-400/20 rounded-2xl ">
    <Inbox className="mr-2 h-5 text-black w-5" />
    <span>Inbox</span>
    </Button>
    <Button variant="ghost" className="justify-start flex hover:bg-blue-400/20 rounded-2xl">
    <Star className="mr-2 h-5 text-black w-5" />
        <span>Starred</span>
    </Button>
    <Button variant="ghost" className="justify-start flex hover:bg-blue-400/20 rounded-2xl">
    <Send className="mr-2 h-5 text-black w-5" />
        <span>Sent</span>
    </Button>
    <Button variant="ghost" className="justify-start flex hover:bg-blue-400/20 rounded-2xl"><File className="mr-2 h-5 text-black w-5" />
    <span> Drafts</span></Button>
  </nav>
  </div>
</aside>

  )
}
