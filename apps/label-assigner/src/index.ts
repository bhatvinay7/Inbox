import express from 'express'
const app = express();
import {labelQueue} from "rabbitmq";
import consumeMessageFromQueue from "./utils/EmaillConsumer.js";
const PORT=3007
try{
  (async()=>{
      await consumeMessageFromQueue('labelQueue');
  })();  
}
catch(error:any){
    console.log(error.message);
}
app.listen(PORT,"0.0.0.0",()=>{
  console.log(`worker is running on port ${PORT}`)
})

