import {assigntagChannel} from 'rabbitmq';
import pushMessageToqueue from './pblish_mailTo_worker_queue.js';
import assignLabel from './agent.js';
import {queueData} from 'types'
export async function consumeMessage(queueName:string){
  try{
    await assigntagChannel.consume(queueName, async(msg) => {
    if (msg !== null) {
     const {message,userId}=JSON.parse(msg.content.toString()) as queueData
     const response=await assignLabel(message); 
     await pushMessageToqueue(JSON.stringify({message:{...message,tag:response},userId:userId}));
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

