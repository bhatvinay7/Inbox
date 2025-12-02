import {postMailChannel, postMailQueue} from 'rabbitmq';
async function pushMessageToqueue(msg:string){     
      try{ 
      postMailChannel.sendToQueue(postMailQueue, Buffer.from(msg));
     }    
 catch(error:any){
    throw new Error(error.message)
 }
}

export default pushMessageToqueue