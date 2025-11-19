import axios from 'axios'
import redisClient from 'redisclient'
import dotenv from 'dotenv'
dotenv.config()
const host=process.env.NEXT_PUBLIC_BACKEND_URL!
async function getAccessToken(userId:string){
    try{
      const redis= await redisClient()  
      const auth_token=await redis.get(`${userId}-inbox_toekn`)
      const response = await axios.get(`${host}/api/refresh-token`, {
     headers: {
      Cookie: `token=${auth_token}; SameSite=Lax; Path=/` 
     }
    })
    return response.data
}
    catch(error:any){
        console.log(error)
        return ""
    }
}

export default getAccessToken