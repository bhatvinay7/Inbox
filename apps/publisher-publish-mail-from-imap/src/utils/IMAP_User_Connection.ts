import createIMAPConnection from "./IMAP_Connection.js";
import getAccessToken from "./getAccessToken.js";
import ListenToIMAP from './listerners.js'
type UserData = {
  userId: string;
  email: string;
  accessToken: string;
};

let attempts = 0;
let maxAttempts = 2;
let retryDelay=2
export default async function getUserImapConnection(user: UserData, connections: Map<string,any>) {

  let currentUser = { ...user };

  try {
    const client = await createIMAPConnection(currentUser);
    if (client) {
      if (!connections.get(user.userId)) {
        connections.set(user.userId, client)
      }
      ListenToIMAP(user, client, connections)
    }
  } catch (err: any) {

    if(attempts>maxAttempts)return 
      console.error(
        `IMAP connection failed for ${currentUser.email} (Attempt ${attempts})`,
        err?.message
      );

      if (err?.response?.status === 401 || err?.code === "AUTHENTICATIONFAILED") {
        console.log("Refreshing access token...");
        try {
          attempts+=1;
          const newUserData = (await getAccessToken(currentUser.userId)) as UserData;
           setInterval(() => {
           retryDelay=Math.min(retryDelay*2,10000)
          getUserImapConnection( newUserData,connections)
          },retryDelay);
          
          if (!newUserData?.accessToken) {
            console.error("Cannot refresh token. Stopping retry.");
          }


        } catch (tokenError) {
          console.error("Failed to refresh access token:", tokenError);
        
        }
      }

      if (err?.code === "ECONNREFUSED" || err?.code === "ETIMEDOUT") {
        console.log("Network issue. Retrying...");
        await wait(1500);
      } else {
        console.log("Non-retryable IMAP error. Stopping.");
      
      }
    }
  }

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
