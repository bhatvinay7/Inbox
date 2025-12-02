import {IMAP_MAIL_QUEUE,imapmailChannel} from "rabbitmq";
import redisClient  from 'redisclient';
import {Mail} from 'types'
async function pushMessageToqueue(userId:string,message:Mail){
    try{
     const redis= await redisClient()   
         imapmailChannel.sendToQueue(IMAP_MAIL_QUEUE, Buffer.from(JSON.stringify({userId:userId,message:message})));
         console.log(JSON.stringify({userId:userId,message:message}))
         await redis.set(`${userId}-inbox`,`${message?.uid}`);
    }
    catch(error:any){
        console.log(error.message);
    }
}

export default pushMessageToqueue;