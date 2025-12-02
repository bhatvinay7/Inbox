import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
dotenv.config();
const ELESTIC_SEARCH_CONNECTION_URL = process.env.ELESTIC_SEARCH_CONNECTION_URL!;
const client = new Client({
  node: ELESTIC_SEARCH_CONNECTION_URL!,
  auth: {
    username: "elastic",
    password: "elestic_search_password",
  },
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});

async function ensureConnection() {
  try {

    let retries = 5;
    while (retries) {
      try {
        await client.ping();
        console.log("Connected to Elasticsearch");
        return true;
      } catch (err) {
        retries -= 1;
        console.error(`ES connection failed. Retrying... (${5 - retries}/5)`);
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
          }, 3000)
        });
      }
    }
    console.error("Could not connect to Elasticsearch after 5 attempts.");
    return false;
  }
  catch (error: any) {
    console.log(error)
  }
}
await ensureConnection();
export default client;
