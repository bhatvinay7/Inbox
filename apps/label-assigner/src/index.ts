import express from 'express'
const app = express();
import {IMAP_MAIL_QUEUE} from "rabbitmq";
import consumeMessageFromQueue from "./utils/EmaillConsumer.js";
const PORT=3007
try{
  (async()=>{
      await consumeMessageFromQueue(IMAP_MAIL_QUEUE);
  })();  
}
catch(error:any){
    console.log(error.message);
}
app.listen(PORT,"0.0.0.0",()=>{
  console.log(`worker is running on port ${PORT}`)
})

