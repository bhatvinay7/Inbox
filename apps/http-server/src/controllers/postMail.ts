import { Request, Response } from 'express'
import getRedisClient from 'redisclient'
import * as z from "zod";
import pushMessageToqueue from '../utils/rabbitmq_user_mail_publisher.js',
import prisma from 'prisma'
import { attachment } from '../../../../packages/types/src/web.types';
const mailSchema = z.object({
  from: z.string(),
  to: z.string(),
  uuid: z.string(),
  body: z.string(),
  subject: z.string(),
  date: z.date(),
  status: z.string(),
  tag: z.string().optional(),
  uid: z.string().optional(),
  raw: z.string().optional(),
  gmailLabels: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional()
});
const postmail = async (req: Request, res: Response) => {
  try {
    const redis = await getRedisClient()
    const data = req.body.mail
    try {
      const result = mailSchema.parse(data);
        await pushMessageToqueue(JSON.stringify(result))
    }
    catch (result: any) {
      const tree = z.treeifyError(result?.error);
      let error: string[]
      for (let i = 0; i < tree.length; i++) {
        error.push(...tree.properties?.favoriteNumbers?.items?.[1]?.errors)
      }
      return res.status(400).json(error)
    }
  }
  catch (error: any) {
    return res.status(500).json({ message: "server Error" })
  }
}