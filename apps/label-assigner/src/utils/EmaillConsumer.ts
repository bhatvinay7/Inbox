import {assigntagChannel} from 'rabbitmq';
import pusshMessageToqueue from './pblish_mailTo_worker_queue';
import assignLabel from '../services/labelAssignerService';
export function consumeMessage(queueName:string){
  try{
    await assigntagChannel.consume(queueName, await(msg) => {
    if (msg !== null) {
     const response=await assignLabel(msg.content.toString()); 
     await pusshMessageToqueue(JSON.stringify({email:msg.content.toString(),customTag:response}));
      assigntagChannel.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });
  }
  catch(error:any){
    console.log(error.message);
  }
}

export default consumeMessage;

