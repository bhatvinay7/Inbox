import {imapmailChannel,ConsumeMessage} from 'rabbitmq';
import pushMessageToqueue from './pblish_mailTo_worker_queue.js';
import assignLabel from './agent.js';
import {queueData} from 'types'
export async function consumeMessage(queueName:string){
  try{
    await imapmailChannel.consume(queueName, async(msg:ConsumeMessage|null) => {
    if (msg !== null) {
     const {message,userId}=JSON.parse(msg.content.toString()) as queueData
     const response=await assignLabel(JSON.stringify(message.body!)); 
     await pushMessageToqueue(JSON.stringify({message:{...message,gmailLabels:[...[message.gmailLabels?.map((a:string)=>a)],response]},userId:userId}));
     console.log(JSON.stringify({message:{...message,gmailLabels:[...[message.gmailLabels?.map((a:string)=>a)],response]},userId:userId}))
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

export default consumeMessage;

