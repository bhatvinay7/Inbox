import express from 'express'
import consumeMessageFrom_IMAP_MAIL_QUEUE from './utils/consumer.js'
const app=express()
const PORT=3008
try{
  (async()=>{
   await consumeMessageFrom_IMAP_MAIL_QUEUE()
  })()
}
catch(error:any){
    console.log(`server error -> ${error.message}`)
}

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`server is running on port ${PORT}`)
})