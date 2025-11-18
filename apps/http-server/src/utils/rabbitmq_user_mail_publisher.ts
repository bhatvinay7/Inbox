import {labelQueue} from 'amqplib';
async function pusshMessageToqueue(msg:string){     
      try{ 
      assigntagChannel.sendToQueue(labelQueue, Buffer.from(msg));
     }    
 catch(error:any){
    throw new Error({message:`${error.message}`})
 }
}