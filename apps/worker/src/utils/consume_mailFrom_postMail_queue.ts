import {postMailChannel, postMailQueue,ConsumeMessage} from 'rabbitmq';
import sendEmail from './sendEmail_Caller.js';
async function  consumeMessageFromPostMailQueue(){
      try{
        postMailChannel.consume(postMailQueue, async(msg:ConsumeMessage|null) => {
          if (msg !== null) {
            await sendEmail(msg.content.toString());
            postMailChannel.ack(msg);
          } else {
            console.log('Consumer cancelled by server');
          } 
      });
    }
      catch(error:any){
          console.log(error.message);
      }

}
export default consumeMessageFromPostMailQueue