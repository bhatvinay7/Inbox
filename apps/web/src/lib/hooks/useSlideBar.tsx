import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {sideBarState,toggleSidebar} from '../../lib/redux/featureSlice/slideBarSlice'
export default function useSlideBar():boolean{
    const value=useSelector(sideBarState) as boolean
    const disPatch=useDispatch()
    async function call_SlideBar_Dispatch(){
        disPatch(toggleSidebar(!value))
    }
  return  {value,call_SlideBar_Dispatch}
}
