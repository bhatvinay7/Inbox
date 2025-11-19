import {labelAssignedQueue,sendMail} from 'rabbitmq';
import sendEmail from './sendEmail.js';
async function  consumeMessageFromAssignTagQueue(){
      try{
        sendMail.consume(labelAssignedQueue, async(msg) => {
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
export default consumeMessageFromAssignTagQueue