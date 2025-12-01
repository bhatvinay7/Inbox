import axiosPublic from "../lib/axios";
import {Mail} from 'types'
export async function getInBoxMails(){
    try{
   const response=await axiosPublic.post('/api/fetch_inbox_mail')
   return response.data
    }
    catch(error:any){
        throw error
    }
}

export async function fetch_all_sent_mail(){
    try{
   const response=await axiosPublic.post('/api/sendMail')
   return response.data
    }
    catch(error:any){
        throw error
    }
}

export async function fetch_sent_mail(uuid:string):Promise<Mail>{
    try{
   const response=await axiosPublic.get(`/api/fetch_sent_mail/${uuid}`)
   return response.data
    }
    catch(error:any){
        throw error
    }
}