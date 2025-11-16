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
            user: "YOUR_EMAIL@gmail.com",
            accessToken: accessToken,
            method: "XOAUTH2",
        },
        logger: false
    });

    await client.connect();
    const lock = await client.getMailboxLock("INBOX");
    try {
        // Get the UID range for latest 40 emails
        const mailbox = client.mailbox;
        const total = mailbox.exists;
        const lastfetchedUID=await redis.get(`${userId}`) ||  null
        let startURID:number;
        if(!lastfetchedUID){
            startUID=total-30+1
            await redis.set(`${userId}`,`${startUID}`);
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
        return messages.reverse();
    } finally {
        lock.release();
        await client.logout();
    }
}
export default fetchLatestEmails;