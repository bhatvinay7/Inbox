import {IMAP_MAIL_QUEUE,imapmailChannel} from "rabbitmq";
import redisClient  from 'redisclient';
import {Mail} from 'types'
async function pusshMessageToqueue(userId:string,message:Mail){
    try{
     const redis= await redisClient()   
     for(let i=0;i<message.length;i++){ 
         imapmailChannel.sendToQueue(IMAP_MAIL_QUEUE, Buffer.from(JSON.stringify({userId:userId,message:message[i]})));
         await redis.set(`${userId}-inbox`,`${message.uid}`);
        }    
    },  
    catch(error:any){
        console.log(error.message);
    }
}

export default pusshMessageToqueue;