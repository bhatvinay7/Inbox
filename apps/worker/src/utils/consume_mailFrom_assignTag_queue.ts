import {labelAssignedQueue,sendMail} from 'rabbitmq';
import sendEmail from './sendEmail';
async function  consumeMessageFromAssignTagQueue(){
      try{
        sendMail.consume(labelAssignedQueue, (msg) => {
          if (msg !== null) {
            await sendEmail(msg.content.toString());
            sendMail.ack(msg);
          } else {
            console.log('Consumer cancelled by server');
          } 
      });
    }
      catch(error:any){
          console.log(error.message);
      }

}