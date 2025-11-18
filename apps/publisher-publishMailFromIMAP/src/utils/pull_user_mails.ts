import { ImapFlow } from "imapflow";
import dotenv from "dotenv";
import redis from "redisClient";
dotenv.config();

export async function fetchLatestEmails(accessToken: string,user_email:string,userId:string) {
    const client = new ImapFlow({
        host: "imap.gmail.com",
        port: 993,
        secure: true,
        auth: {
            user: user_email!,
            accessToken: accessToken,
            method: "XOAUTH2",
        },
        logger: false
    });

    await client.connect();
    const lock = await client.getMailboxLock("INBOX");
    try {
        const mailbox = client.mailbox;
        const total = mailbox.exists;
        const lastfetchedUID=await redis.get(`${userId}`) ||  null
        let startURID:number;
        if(!lastfetchedUID){
            startUID=(total-30) >0 ? (total-30)+1 : total
        }
        else{
            startUID=total-parseInt(lastfetchedUID) +1
        }
        const messages = [];
       for await (let msg of client.fetch(`${startUID}:*`, {
        uid: true,
        envelope: true,
        flags: true,
        gmailLabels: true
})) {
        messages.push({
        uid: msg.uid,
        subject: msg.envelope.subject,
        from: msg.envelope.from,
        date: msg.envelope.date,
        labels: msg.gmailLabels,
  });
}
        return messages
    } finally {
        lock.release();
        await client.logout();
    }
}
export default fetchLatestEmails;