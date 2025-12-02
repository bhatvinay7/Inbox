import React from 'react'
import {Button} from 'inbox-ui'
import { RotateCcw } from 'lucide-react'
export default function Pagination() {
  return (
    <div className=" flex-1 flex  items-center  w-full  justify-between px-4 py-1 bg-gray-100 border-b ">
<div className="flex items-center gap-3">
<input aria-label='check-box' type="checkbox" className="h-4 w-4" />
<Button variant="destructive" className='text-black/75 flex items-center gap-x-1' size="sm">

<RotateCcw className="w-4 h-4 text-gray-500"/><span>
Refresh    </span></Button>
<Button variant="ghost" className='text-black/75' size="sm">More</Button>
</div>
<div className="flex items-center gap-2 text-sm text-gray-600">
<span>1–50 of 500</span>
<Button variant="ghost" size="icon" className="h-8 w-8">‹</Button>
<Button variant="ghost" size="icon" className="h-8 w-8">›</Button>
</div>
</div>
  )
}
