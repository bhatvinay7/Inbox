import client from 'elesticsearch'
import getRedisClient from 'redisclient'
import { Request, Response } from 'express'
const fetch_user_mail = async (req: Request, res: Response){
    try {
        const redis= await getRedisClient()
        const email = req.user
        const mails = await redis.lRange(`${userId}-emails`, 0, -1);
        if (mails) {
            res.status(200).json(mails)
        }
        const result = await client.search({
            index: "emails",
            size: 30,
            query: {
                match: { to: email }
            },
            sort: ["created_at:desc"],
        });
        res.status(200).json(mails)
    }
    catch (error: any) {
        res.status(500).json({ message: "server error" })
    }
}