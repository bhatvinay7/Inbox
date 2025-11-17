import {labelQueue} from "amqplib";
import consumeMessage from "./consume_mail_from_label_queue";
import consumeMessage from "./utils/EmaillConsumer";
try{
  (async()=>{
      await consumeMessage('labelQueue');
  })();  
}
catch(error:any){
    console.log(error.message);
}

