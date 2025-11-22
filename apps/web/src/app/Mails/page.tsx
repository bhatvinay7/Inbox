'use client'
import React from "react";
import { Mail, Star, Inbox, Send, File, Menu, Search, X, Filter,Pen } from "lucide-react";
import { Card, CardContent } from "inbox-ui";
import { Input } from "inbox-ui";
import { Button } from "inbox-ui";
import Sidebar from "../../components/ui/sidebar";
import Header from '../../components/ui/header'
import Pagination from '../../components/ui/pagination'
import UserProfileWindow from '../../components/ui/userProfileWindow'
import Compose from '../../components/ui/compose'
export default function Mails() {
  return (
    <div  className=' flex flex-col w-full relative items-center  bg-white h-screen '>
      <div className=" w-full sticky top-16 z-35 ">
      <Pagination/>
      </div>
      {/* <UserProfileWindow/> */}
        <div className="overflow-y-auto w-full scrollbar-thin scrollbar-thumb-gray-400 overflow-x-hidden scrollbar-track-gray-200 space-y-1">
          {[...Array(10)].map((_, i) => (
            <Card key={i} className=" hover:bg-gray-100 border border-black/10 hover:scale-[101%]  overflow-x-hidden rounded-none  cursor-pointer">
              <CardContent className="flex items-center overflow-x-hidden justify-between p-2">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-black/75 ">Sender {i + 1}</span>
                </div>
                <div className="flex-1 ml-4 text-gray-700 text-sm truncate font-medium font-sans">Email subject line example - message preview text goes here...</div>
                <div className="text-sm text-gray-500 whitespace-nowrap">12 Jun</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  );
}
