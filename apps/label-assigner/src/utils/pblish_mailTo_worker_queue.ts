import {sendMail,workerQueue} from "amqplib";
async function pusshMessageToqueue(message:string){
    try{
  sendMail.sendToQueue(workerQueue, Buffer.from(message));
},  
    catch(error:any){
        console.log(error.message);
    }
}

export default pusshMessageToqueue;