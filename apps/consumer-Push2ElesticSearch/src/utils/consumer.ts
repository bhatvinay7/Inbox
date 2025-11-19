import redisClient from 'redisclient'
import {IMAP_MAIL_QUEUE,imapmailChannel} from 'rabbitmq';
import pushMailToElesticSearch from './pushMailsToElesticSearch.js';
import {queueData} from 'types'
async function  consumeMessageFrom_IMAP_MAIL_QUEUE(){
      try{
        const redis= await redisClient()
        imapmailChannel.consume(IMAP_MAIL_QUEUE, async(msg) => {
          if (msg !== null) {
            const {userId,message}=JSON.parse(msg.content.toString()) as queueData
            await pushMailToElesticSearch(message);
            await redis.lPush(`${userId}-emails`,JSON.stringify(message));
            await redis.lTrim(`${userId}-emails`, 0, 29);
            imapmailChannel.ack(msg);
          } else {
            console.log('Consumer cancelled by server');
          } 
      });
    }
      catch(error:any){
          console.log(error.message);
      }

}

export default consumeMessageFrom_IMAP_MAIL_QUEUE