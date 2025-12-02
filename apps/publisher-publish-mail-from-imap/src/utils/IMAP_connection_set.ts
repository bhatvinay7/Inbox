// @ts-nocheck
import IMAP_USER_CONNECTION from './IMAP_User_Connection.js'
import { ImapFlow } from 'imapflow';
import {prisma} from 'prisma'
const connections=new Map<string,ImapFlow>()

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runImapConnection() {
  setInterval(async()=>{
        try {
      const activeUsers = await prisma.user.findMany()

      for (const user of activeUsers) {
        if (!connections.has(user.id)) {
       IMAP_USER_CONNECTION({
            userId: user.id,
            email: user.email,
            accessToken: user.accessToken
          },connections)
        }
      }
    } catch (error: any) {
      console.log("Error while creating new connection:", error.message);
    }


  },20000)
}

export default runImapConnection;
