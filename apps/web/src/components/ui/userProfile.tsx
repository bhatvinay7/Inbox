import React from "react";
import { HelpCircle, Settings, Sparkles, Grid3x3 } from "lucide-react";

export default function UserProfileIcon() {
  return (
    <div className="flex ml-auto right-2 items-center  gap-4 mr-4">
      {/* <HelpCircle className="h-5 w-5 text-gray-600 cursor-pointer" /> */}
      <Settings className="h-5 w-5 text-gray-600 cursor-pointer" />
      {/* <Sparkles className="h-5 w-5 text-gray-600 cursor-pointer" /> */}
      {/* <Grid3x3 className="h-5 w-5 text-gray-600 cursor-pointer" /> */}
      <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center text-white font-medium cursor-pointer">V</div>
    </div>
  );
}
