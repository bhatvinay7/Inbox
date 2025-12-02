import {storeMail,labelAssignedQueue,ConsumeMessage} from 'rabbitmq';
import pushMailToElesticSearch from './pushMailsToElesticSearch_AND_DB.js';
import {queueData} from 'types'
async function  consumeMessageFrom_IMAP_MAIL_QUEUE(){
      try{
        storeMail.consume(labelAssignedQueue, async(msg:ConsumeMessage |null) => {
          if (msg !== null) {
            const {userId,message}=JSON.parse(msg.content.toString()) as queueData
            await pushMailToElesticSearch(userId,message);
            storeMail.ack(msg);
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