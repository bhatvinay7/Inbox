'use client'
import React from 'react'
import { Button } from 'inbox-ui'
import { Mail, Star, Inbox, Send, File, Pen } from "lucide-react";
import useSlideBar from '../../lib/hooks/useSlideBar'

export default function Sidebar() {
  const {value,call_SlideBar_Dispatch}= useSlideBar()

  return (
    <aside className="w-full bg-blue-50/60 sticky top-20 h-auto hidden md:flex flex-col space-y-2 p-2">

      {value ? (
        <>
          {/* Compose full version */}
          <div className="flex items-start justify-center mt-2 px-4">
            <Button className="w-full text-black/75 bg-blue-400/35 hover:bg-blue-400/20 rounded-3xl justify-start flex">
              <Pen className="mr-2 h-5 w-5 text-black" /> Compose
            </Button>
          </div>

          <nav className="flex flex-col text-black/75 p-4 space-y-2">
            <Button variant="link" className="justify-start flex  hover:bg-blue-400/20 rounded-2xl">
              <Inbox className="mr-2 h-5 w-5 text-black" /> Inbox
            </Button>
            <Button variant="ghost" className="justify-start flex  hover:bg-blue-400/20 rounded-2xl">
              <Star className="mr-2 h-5 w-5 text-black" /> Starred
            </Button>
            <Button variant="ghost" className="justify-start flex  hover:bg-blue-400/20 rounded-2xl">
              <Send className="mr-2 h-5 w-5 text-black" /> Sent
            </Button>
            <Button variant="ghost" className="justify-start flex  hover:bg-blue-400/20 rounded-2xl">
              <File className="mr-2 h-5 w-5 text-black" /> Drafts
            </Button>
          </nav>
        </>
      ) : (
        <>
          {/* Icon-only version */}
          <div className="px-4 mt-2">
            <Button className="w-fit rounded-full p-2 text-black/75 bg-blue-400/35 hover:bg-blue-400/20  justify-center">
              <Pen className="h-5 w-5 text-black" />
            </Button>
          </div>

          <nav className="flex flex-col text-black/75 p-4 space-y-2">
            <Button variant="link" className=" w-fit justify-center flex bg-black/10 hover:bg-blue-400/20 rounded-full p-2">
              <Inbox className="h-5 w-5 text-black" />
            </Button>
            <Button variant="ghost" className=" w-fit justify-center flex bg-black/10 hover:bg-blue-400/20 rounded-full p-2">
              <Star className="h-5 w-5 text-black" />
            </Button>
            <Button variant="ghost" className=" w-fit justify-center flex bg-black/10 hover:bg-blue-400/20 rounded-full p-2">
              <Send className="h-5 w-5 text-black" />
            </Button>
            <Button variant="ghost" className=" w-fit justify-center flex bg-black/10 hover:bg-blue-400/20 rounded-full p-2">
              <File className="h-5 w-5 text-black" />
            </Button>
          </nav>
        </>
      )}
    </aside>
  )
}
