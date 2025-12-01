import {Request,Response} from 'express'
import refreshAccessToken from '../utils/refreshAccessToken.js'
import getRedisClient from 'redisclient'
import {prisma} from 'prisma'
import { userCredentials } from 'types';
type userData={
    email:string,
    userId: string,
    accessToken:string
}
const refreshAccessTokenController=async(req:Request,res:Response):Promise<userData|{}>=>{
    try{
    const redis= await getRedisClient()  
    let refreshToken=""
    const userId=decodeURIComponent(req.query.userId as string)
    if(!userId){
        return res.status(400).json("userId is not provided")
    }
    const fetchFromredis=await redis.get(`${userId}-inbox-token`)
    refreshToken= fetchFromredis ? fetchFromredis :(await prisma.user.findFirst({where:{id:userId},select:{
           refreshToken:true
    }}))?.refreshToken!
    const accessToken =await refreshAccessToken(refreshToken)
    await redis.set(`${userId}-access_token`,accessToken)
     const updatedUser=  await prisma.user.update({where:{id:userId},
      data:{
         accessToken:accessToken
      }
     })
    return res.status(200).json({email:updatedUser.email,userId:updatedUser.id,accessToken}) 
    }
    catch(error:any){
    console.log(error)    
    return res.status(500).json({message:"server error"})
    }
}

export default refreshAccessTokenController