import { createClient } from "redis";
const REDIS_URL = process.env.REDIS_URL!;
async function redisClient() {
try{
    const redisClient=await createClient({
  url: REDIS_URL!,
});
    redisClient.connect();
    redisClient.on("error", (err) => console.log("Redis Client Error", err));
    return redisClient;
    }
    catch(error:any){
        console.log(error.message);
    }
}
const client= await redisClient();
export default client;