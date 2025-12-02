import {storeMail,labelAssignedQueue} from "rabbitmq";
async function pushMessageToqueue(message:string){
    try{
     storeMail.sendToQueue(labelAssignedQueue, Buffer.from(message));
    }
    catch(error:any){
        console.log(error.message);
    }
}

export default pushMessageToqueue;