import {Request,Response} from 'express'
import refreshAccessToken from '../utils/refreshAccessToken.js'
import getRedisClient from 'redisclient'
import {prisma} from 'prisma'

const refreshAccessTokenController=async(req:Request,res:Response)=>{
    try{
    const redis= await getRedisClient()  
    let refreshToken
    const userId=decodeURIComponent(req.query.userId as string)
    if(!userId){
        return res.status(400).json("userId is not provided")
    }
    const fetchFromredis=await redis.get(`${userId}-inbox-token`)
    refreshToken=fetchFromredis ? fetchFromredis :(await prisma.user.findFirst({where:{id:userId},select:{
           refreshToken:true
    }}))?.refreshToken!
    const accessToken =await refreshAccessToken(refreshToken)
    console.log(accessToken)
    await redis.set(`${userId}-access_token`,accessToken)
    return res.status(200).json(accessToken) 
    }
    catch(error:any){
        console.log(error.message)
    return res.status(500).json({message:"server error"})
    }
}

export default refreshAccessTokenController