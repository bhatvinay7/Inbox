import {Request,Response} from 'express'
import refreshAccessToken from '../utils/refreshAccessToken'
import redis from 'redisclient'
import prisma from 'prisma'

export interface AuthRequest extends Request {
  user?:
    | {
        userId: string;
        username: string;
        picture: string;
        google_access_token: string;
        isVerified: boolean;
        
      }
}
const refreshAccessToken=async(req:AuthRequest,res:Response)=>{
    try{
    let refreshToken
    const userId= req.user.userId!    
    const fetchFromredis=await redis.get(`${userId}`)
    refreshToken=fetchFromredis ? fetchFromredis :await prisma.user.findFirst({where:{id:userId},select:{
           refreshToken:true
    }})
     await refreshAccessToken(refreshToken)
    return res.status(200).json({message:"new accessToken is successfully generated"}) 
    }
    catch(error:any){
     res.status(500).json({message:"server error"})
    }
}

export default refreshAccessToken