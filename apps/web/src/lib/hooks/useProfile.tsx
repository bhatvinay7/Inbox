import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {profileState,toggleProfile} from '../../lib/redux/featureSlice/profileSlice'
export default function useProfile():boolean{
    const value=useSelector(profileState) as boolean
    const disPatch=useDispatch()
    async function callDispatch(){
        disPatch(toggleProfile(!value))
    }
  return  {value,callDispatch}
}
