import amqplib from 'amqplib';
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

async function callRabbit() => {
  const labelQueue = 'labelQueue';
  const labelAssignedQueue = 'workerQueue';
  const connection = await amqplib.connect(RABBITMQ_CLUSTER_URL!);

  const assigntagChannel = await connection.createChannel();
  await assigntagChannel.assertQueue(labelQueue, { durable: true });

  const sendMail= await connection.createChannel();
  await sendMail.assertQueue(labelAssignedQueue, { durable: true });

  connection.on('error', async (err) => {
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
 return {ssigntagChannel,sendMail};
}

const {ssigntagChannel, sendMail} = await callRabbit();
export {ssigntagChannel, sendMail};
