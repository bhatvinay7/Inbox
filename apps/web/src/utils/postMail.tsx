import axiosPublic from "../lib/axios";
export async function postMail(){
    try{
   const response=await axiosPublic.post('/api/sendMail')
   return response.data
    }
    catch(error:any){
        throw error
    }
}