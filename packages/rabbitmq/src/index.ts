import amqplib,{ConsumeMessage} from 'amqplib';
import dotenv from 'dotenv';
const RABBITMQ_CLUSTER_URL = process.env.RABBITMQ_CLUSTER_URL!;
dotenv.config();
let retryAttempt = 0;
const retryLow = 1000;
const retryHigh = 30000;

function getBackoffDelay(attempt: number) {
  const delay = retryLow * 2 ** attempt;
  return Math.min(delay, retryHigh);
}

async function callRabbit(){
  const postMailQueue = 'postMail';
  const labelAssignedQueue = 'workerQueue';
  const IMAP_MAIL_QUEUE = 'workerQueue';
  const connection = await amqplib.connect(RABBITMQ_CLUSTER_URL!);

  const postMailChannel = await connection.createChannel();
  await postMailChannel.assertQueue( postMailQueue, { durable: true });

  const storeMail= await connection.createChannel();
  await storeMail.assertQueue(labelAssignedQueue, { durable: true });
  
  const imapmailChannel = await connection.createChannel();
  await imapmailChannel.assertQueue(IMAP_MAIL_QUEUE, { durable: true });

  connection.on('error', async (err:any) => {
   const delay = getBackoffDelay(retryAttempt);
   console.log(`Retrying connection in ${delay} ms`)
   setTimeout(() => {
     retryAttempt++;    
    callRabbit();
   }, delay);
 });

 connection.on('connection', () => {
   console.log('Connection successfully (re)established');
   retryAttempt=0
 });
 return {postMailChannel, storeMail, postMailQueue,labelAssignedQueue,IMAP_MAIL_QUEUE,imapmailChannel};
}

const {postMailChannel, storeMail, postMailQueue,labelAssignedQueue,IMAP_MAIL_QUEUE,imapmailChannel} = await callRabbit();
export {postMailChannel, storeMail, postMailQueue,labelAssignedQueue,imapmailChannel,IMAP_MAIL_QUEUE};
export type {ConsumeMessage}