// @ts-nocheck
import prisma,{User} from 'prisma'
import {Mail} from 'types'
import { ImapFlow,ImapFetchMessageObject } from 'imapflow';
import dotenv from "dotenv";
import redisClient from "redisclient";
import pushMessageToqueue from './publisher.js'
type userData={
    userId:string,
    email:string,
    accessToken:string
}
export async function fetchLatestEmails(user:userData,client) {
    try{
const redis=await redisClient()      
const lock = await client.getMailboxLock("INBOX")
const mailbox = client.mailbox;
 const total = mailbox.exists;
 const lastfetchedUID=await redis.get(`${user.userId}-inbox`) ||  null
 let startUID:number;
 if (!lastfetchedUID) {
  startUID = Math.max(1, total - 29)
} else {
  startUID = parseInt(lastfetchedUID) + 1;
}
 const messages=[] as Mail[];
 for await (let msg   of client.fetch(`${startUID}:*`, {
     uid: true,
     envelope: true,
     flags: true,
     gmailLabels: true,
     headers: ["message-id","subject","from","to","data"]
 } as ImapFetchMessageObject)) {
    pushMessageToqueue(user.id,{
        uid: msg.uid,
        subject: msg.envelope.subject,
        from: msg.envelope.from,
        to: msg.envelope.to,
        date: msg.envelope.date,
        gmailLabels: msg.gmailLabels,
        raw: msg.source?.toString(),
        messageId: msg.header.get("message-id")  
    })
}
    
lock.release();
}
catch(error:any){
    console.log(`error --> ${error.message}}`)
}
}
export default fetchLatestEmails