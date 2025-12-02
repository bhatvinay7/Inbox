import { Request, Response } from 'express'
import getRedisClient from 'redisclient'
import z from "zod"
// import pushMessageToqueue from '../utils/rabbitmq_user_mail_publisher.js'
const mailSchema = z.object({
  userId:z.string(),
  from: z.string(),
  to: z.string(),
  uuid: z.string(),
  body: z.string(),
  subject: z.string(),
  date: z.date(),
  status: z.string(),
  parentMailId:z.string().optional(),
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
        // await pushMessageToqueue(JSON.stringify(result))
    return res.status(200).json(result)    
    }
    catch (result: any) {
      const tree = z.treeifyError(result?.error);
      let error:string[]=[]
      for (let i = 0; i < tree.errors.length; i++) {
        error.push(tree?.errors?.[i]!)
      }
      return res.status(400).json(error)
    }
  }
  catch (error: any) {
    return res.status(500).json({ message: "server Error" })
  }
}

export default postmail