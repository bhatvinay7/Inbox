import React from "react";
import { Star, Reply, Forward, MoreVertical, Printer, ExternalLink } from "lucide-react";

export default function MailDetailHeader() {
  return (
    <div className="w-full flex items-start justify-between pb-4 border-b border-b-black/12">
      {/* LEFT SECTION */}
      <div>
        {/* Subject + Tag */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-black">
            Indeed Application: Software Engineer
          </h1>

          <span className="px-2 py-1 text-xs bg-gray-400 rounded-lg">
            Inbox ✕
          </span>
        </div>

        {/* Sender Info */}
        <div className="flex items-center gap-3 mt-4">
          <div className="h-10 w-10 rounded-full bg-blue-300 flex items-center justify-center text-blue-900">
            <span className="font-bold">I</span>
          </div>

          <div>
            <p className="font-semibold text-black">Indeed Apply</p>
            <p className="text-gray-600 text-sm">indeedapply@indeed.com</p>
          </div>

          <p className="text-gray-500 ml-2">to me ▾</p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col items-end p-1.5">
        <p className="text-gray-500 text-sm">
          Fri 21 Nov, 14:51 (20 hours ago)
        </p>

        {/* Icons */}
        <div className="flex items-center gap-4 mt-3 text-gray-600 px-2 ">
          {/* <Printer className="h-5 w-5 cursor-pointer" /> */}
          <ExternalLink className="h-5 w-5 cursor-pointer" />
          <Star className="h-5 w-5 cursor-pointer" />
          <Reply className="h-5 w-5 cursor-pointer" />
          <Forward className="h-5 w-5 cursor-pointer" />
          {/* <MoreVertical className="h-5 w-5 cursor-pointer" /> */}
        </div>
      </div>
    </div>
  );
}
