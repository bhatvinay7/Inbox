import express from 'express';
const app = express();
import PullUserMails from './utils/pull_user_mails';
import pusshMessageToqueue from './utils/publisher';
import redis from 'redisclient';
import express from 'express';

async function startMailPublisher() {
    await redis.connect();
    await redis.on('connect', () => {
        console.log("Redis connected successfully");
    })
    redis.subscribe('pull_user_mails', async (message: string) => {
        // add the refrsh accessToken logic here if token is expired
        const { userId, user_email, accessToken } = JSON.parse(message);
        console.log(`Received message to pull mails for user: ${user_email}`);
        const mails = await PullUserMails(user_email, accessToken);
        await pusshMessageToqueue({ userId, mails });
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
app.listen(3010,"0.0.0.0",()=>{
    console.log(`server is runnning on port ${3010}`)
})