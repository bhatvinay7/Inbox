import client from 'elastic-search'
import getRedisClient from 'redisclient'
import {prisma} from 'prisma'
import { Request, Response } from 'express'
import { AuthRequest, userCredentials } from 'types'
const fetch_user_mail = async (req: AuthRequest, res: Response)=>{
    try {
        const redis= await getRedisClient()
        const user = req.user
        const mails = await redis.LRANGE(`${user?.userId!}-emails`, 0, -1);
        if (mails) {
        return    res.status(200).json(mails)
        }
        const result = await client.search({
            index: "emails",
            size: 30,
            query: {
                match: { to: user?.email }
            },
            sort: ["date:desc"],
        });
    return res.status(200).json(result)
    }
    catch (error: any) {
    return   res.status(500).json({ message: "server error" })
    }
}

const fetch_thread_mails=async (req: Request, res: Response)=>{
      try{
       const conversationId=req.params?.conversationId! as string
       const mailId=req.query.Id as string
       if(!conversationId && !mailId){
         return res.status(400).json({message:"fields are missing"})
       }
       if(conversationId){
        const result = await client.search({
        index: "emails",
        size: 30,
        query: {
        term: { conversationId }
      },
        sort: ["date:asc"]
    });

    const data=result.hits.hits.map((item: any) => item._source);
    return res.status(200).json(data)
       }
    // if you have single mail(no threads) then posgres,it will be faster    
       if(mailId){
        const mail = await prisma.mail.findUnique({
        where: { id: mailId },
        include: {
          attachments: true,
          mailStatuses: true
        }
      });
      return res.status(200).json(mail)
       }
      }
      catch(error:any){
        return res.status(500).json({message:"server error"})
        console.log(error.message)
      }
}

const fetch_single_sentMail = async (req: AuthRequest, res: Response)=>{
    try {
        const  uuid=req.params.uuid!
        if(!uuid){
            return res.status(400).json({message:"mails id is not provided"})
        }
        const result = await client.search({
            index: "emails",
            query: {
                match: { uuid:uuid }
            },
        });
    return res.status(200).json(result)
    }
    catch (error: any) {
    return   res.status(500).json({ message: "server error" })
    }
}
export {fetch_single_sentMail,fetch_user_mail,fetch_thread_mails}