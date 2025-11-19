import express from 'express';
const app = express();
import PullUserMails from './utils/pull_user_mails.js';
import pushMessageToqueue from './utils/publisher.js';
import  redisClient from 'redisclient';
const PORT=3009

async function startMailPublisher() {
    const redis= await redisClient()
    await redis.connect();
    await redis.on('connect', () => {
        console.log("Redis connected successfully");
    })
    redis.subscribe('pull_user_mails', async (message: string) => {
        // add the refrsh accessToken logic here if token is expired
        const { userId, user_email, accessToken } = JSON.parse(message);
        console.log(`Received message to pull mails for user: ${user_email}`);
        const mails = await PullUserMails(user_email, accessToken);
        await pushMessageToqueue(userId, mails );
    })
}

try {
    (async () => {
        await startMailPublisher();
    })();
}
catch (error: any) {
    console.log(error.message);
}
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`server is runnning on port ${PORT}`)
})