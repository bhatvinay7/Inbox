'use client'
import React from 'react'
import {Button } from 'inbox-ui'
import Sidebar from "../../../../components/ui/sidebar";
import MailDetailHeader from '../../../../components/ui/MailDatailHeader'
import  { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import moment from "moment";
import Header from '../../../../components/ui/header';
import { Star, Reply, Forward, MoreVertical, Printer, ExternalLink } from "lucide-react";
export default function MailDetail() {
  const { id } = useParams(); // mail id from URL

  const [email, setEmail] = useState({
  id: "1",
  from: "sundar.pichai@google.com",
  to: "you@example.com",
  subject: "Welcome to Your New Inbox 🚀",
  body: `Hi there,

Thank you for joining our platform! We’re excited to have you onboard.

Here are a few things you can do right away:
- Explore your mailbox
- Customize your settings
- Try sending a new message

If you have any questions, feel free to reply to this email.

Regards,
Support Team
Google Workspace`,
  tag: "Primary",
  date: new Date().toISOString(),
});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMail() {
      try {
        // const res = await axios.get(`/api/mails/${id}`, {
          // withCredentials: true,
        // });

        // const mailData = res.data;

        // Format date using moment
        // const formattedMail = {
          // ...mailData,
          // date: moment(mailData.date).fromNow(),
        // };

        // setEmail(formattedMail);
        setLoading(false);
      } catch (err: any) {
        setError("Failed to load mail.");
        setLoading(false);
      }
    }

    fetchMail();
  }, [id]);

  if (loading) return <div className=" w-full   h-screen grid grid-cols-1 sm:grid-cols-[150px_1fr] md:grid-cols-[280px_1fr] overflow-y-auto">Loading...</div>;
  if (error) return <div className=" w-full h-screen  grid grid-cols-1 sm:grid-cols-[150px_1fr] md:grid-cols-[280px_1fr] overflow-y-auto">{error}</div>;
  if (!email) return null;

  return (
    <div  className='flex-1 flex flex-col w-full items-center bg-white min-h-screen '>
  
      {/* <div className="mb-4"> */}
        {/* <h2 className="text-2xl font-semibold">{email.subject}</h2> */}
        {/* <p className="text-black text-sm">{email.tag}</p> */}
      {/* </div> */}

      {/* From / To / Date */}
      <div className=' flex-1  h-screen w-full  p-4 '>

      <MailDetailHeader/>

      {/* Body */}
      <div className='w-full flex items-center justify-center'>

      <div className=" w-fit items-center bg-yellow-50/45 p-4  text-gray-800 whitespace-pre-line leading-relaxed">
        {email.body}
      </div>
      </div>

      {/* Reply / Forward */}
      <div className="flex gap-3 mt-8">
        <Button variant="default" className="px-6 cursor-pointer hover:scale-[103%] bg-slate-200 rounded-full border border-black/15 text-black/75">
        <div className='flex w-fit items-center gapx-1'>
        <Reply className="h-5 w-5 cursor-pointer" />
        <span className='font-normal'>Reply</span>
        </div>
        </Button>
        <Button variant="default" className="px-6 bg-slate-200 hover:scale-[103%] cursor-pointer rounded-full border border-black/15 text-black/75">
         <div className='flex w-fit items-center gapx-1'>
         <Forward className="h-5 w-5 cursor-pointer" />
        <span className='font-normal'>Forward</span>
         </div>
        </Button> 
      </div>
    </div>
      </div>
  );
}
