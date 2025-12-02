import express from 'express';
import consumeMessageFrom_IMAP_MAIL_QUEUE from './utils/consume_mailFrom_postMail_queue.js';
const PORT=3008
const app=express()
try{
   (async()=>{
    await consumeMessageFrom_IMAP_MAIL_QUEUE()
   })()
}
catch(error:any){
    console.log(error)
}

app.listen(PORT,"0.0.0.0",()=>{console.log(`worker is running on port ${PORT}`)})