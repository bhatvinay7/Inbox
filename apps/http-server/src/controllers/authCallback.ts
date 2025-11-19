import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import getUserdata from "../utils/getUserdata.js";
import {AuthRequest } from 'types'
import getRedisClient from 'redisclient'
import prisma from 'prisma'
import dotenv from 'dotenv'
dotenv.config()

const SECRET_KEY = process.env.secret_key!;
const ACCESS_KEY= process.env.access_key!
const callbackHandler = async (req: AuthRequest, res: Response) => {
  try {
    const redis= await getRedisClient()
    const data = await getUserdata(req, res);
    console.log(data)
    if (!data?.email) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    let user= await prisma.user.findFirst({where:{ email: data.email }});
    if (!user) {
      user = await prisma.user.create({
        name: data.name,
        email: data.email,
        isEmailVerified: true,
        picture: data.picture,
        refreshToken:data.refresh_token,
      })
    }
    
    else{
      await prisma.user.update({
        where:{email:data.email},
        data:{
          refreshToken:data.data.refresh_token,
        }
      })
    }
    const refreshToken = jwt.sign(
      {
        username: user.name!,
        email: user.email!,
        userId: user.id,
        picture:user.picture,
        isVerified:true,
        google_access_token:data.access_token,
        google_refresh_token:data.refresh_token
      },
      SECRET_KEY,
      { expiresIn: "24d" }
    );
    const acces_token = jwt.sign(
      {
        username: user.name!,
        email: user.email!,
        userId: user.id,
        picture:user.picture,
        isVerified:true,
        google_access_token:data.access_token,
        google_refresh_token:data.refresh_token
        
      },
      ACCESS_KEY ,
      { expiresIn: "7d" }
    );
    
    await redis.set(`${user.id}-access_token`,data.access_token) 
    await redis.set(`${user.id}-inbox-token`,refreshToken)
    res.cookie("inbox_token", refreshToken , {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain:".shortner.services",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path:"/"
    });

    return res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL!}`);
  } catch (error: any) {
    console.error("OAuth Error:", error.message);
    return res.status(500).json({ message: "OAuth error", error: `${error.message}` });
  }
};

export default callbackHandler;
