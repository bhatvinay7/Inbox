import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const host=process.env.NEXT_PUBLIC_BACKEND_URL!
type userData={
    userId:string,
    email:string,
    accessToken:string
}
async function getAccessToken(userId:string):Promise<userData| null>{
    try{  
    const response = await axios.post(`${host}/api/refresh-token?userId=${encodeURIComponent(userId)}`,{},{
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  })

    return response.data as userData
}
    catch(error:any){
        console.log(error)
        return null
    }
}

export default getAccessToken