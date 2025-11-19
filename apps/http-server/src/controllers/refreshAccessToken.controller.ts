import {Request,Response} from 'express'
import refreshAccessToken from '../utils/refreshAccessToken.js'
import getRedisClient from 'redisclient'
import {AuthRequest } from 'types'
import prisma from 'prisma'

const refreshAccessTokenController=async(req:AuthRequest,res:Response)=>{
    try{
    const redis= await getRedisClient()  
    let refreshToken
    const userId= req?.user?.userId!    
    const fetchFromredis=await redis.get(`${userId}`)
    refreshToken=fetchFromredis ? fetchFromredis :await prisma.user.findFirst({where:{id:userId},select:{
           refreshToken:true
    }})
    const accessToken =await refreshAccessToken(refreshToken)
    return res.status(200).json(accessToken) 
    }
    catch(error:any){
     res.status(500).json({message:"server error"})
    }
}

export default refreshAccessTokenController