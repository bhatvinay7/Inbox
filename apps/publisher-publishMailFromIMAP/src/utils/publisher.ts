import {IMAP_MAIL_QUEUE,imapmailChannel} from "amqplib";
import redis  from 'redisclient';
interface MailMessage{
    uid:number;
    subject:string;
    from:string;
    to:string[];
    date:string;
    body:string;
    gmailLabels:string[];
}
async function pusshMessageToqueue(message:MailMessage){
    try{
     for(let i=0;i<message.length;i++){ 
         imapmailChannel.sendToQueue(IMAP_MAIL_QUEUE, Buffer.from(JSON.stringify(message[i])));
         await redis.set(`${userId}`,`${message.uid}`);
        }    
    },  
    catch(error:any){
        console.log(error.message);
    }
}

export default pusshMessageToqueue;