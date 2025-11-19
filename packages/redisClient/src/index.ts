import { createClient,RedisClientType } from "redis";
import dotenv from 'dotenv';
dotenv.config();
let redis:RedisClientType
const REDIS_URL = process.env.REDIS_URL!;
const getrRedisClient=async function redisClient():Promise<RedisClientType>{
try{
    if(!redis){
    redis=createClient({
  url: REDIS_URL!,
});
    }
    // await redisClient.connect();
    redis.on("error", (err:any) => console.log("Redis Client Error", err));
    return redis;
    }
    catch(error:any){
       throw new Error("Redis connection failed");

    }
}

export default getrRedisClient