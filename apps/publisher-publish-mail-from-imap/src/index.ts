import express from 'express';
const app = express();
import IMAP_connection_set from './utils/IMAP_connection_set.js'
const PORT=3009

try {
   (async()=>{
       await IMAP_connection_set();
   })()
}
catch (error: any) {
    console.log(error.message);
}
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`server is runnning on port ${PORT}`)
})