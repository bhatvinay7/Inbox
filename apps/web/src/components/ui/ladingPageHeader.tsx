import React from 'react'

export default function LadingPageHeader() {
  return (
     <nav className="w-full sticky top-0 z-35 py-4 px-8 flex justify-between items-center shadow-sm bg-white dark:bg-gray-800">
   <h1 className="text-2xl font-bold text-gray-900 dark:text-white/75">Inbox</h1>
   <button
     id="themeToggle"
     className="px-4 py-2 rounded-xl border dark:border-gray-700 shadow-sm text-gray-900 dark:text-white"
     onClick={() => {
       document.documentElement.classList.toggle('dark');
     }}
   >
     Toggle Theme
   </button>
 </nav>
  )
}
