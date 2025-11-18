import {IMAP_MAIL_QUEUE,imapmailChannel} from 'rabbitmq';
import pushMailToElesticSearch from './pushMailsToElesticSearch';
async function  consumeMessageFrom_IMAP_MAIL_QUEUE(){
      try{
        imapmailChannel.consume(IMAP_MAIL_QUEUE, (msg) => {
          if (msg !== null) {
            await pushMailToElesticSearch(msg.content.toString());
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