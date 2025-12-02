// @ts-nocheck
import { ImapFlow } from 'imapflow';
type userData={
    userId:string,
    email:string,
    accessToken:string
}
async function createIMAPConnection(user:userData):Promise<ImapFlow>{
    try{
        
        const client = new ImapFlow({
            host: "imap.gmail.com",
            port: 993,
            secure: true,
            auth: {
                user: user.email,
                accessToken: user.accessToken.trim(),
                method: "XOAUTH2",
            },
            // auth: {
                // user: 'bhatvinay74@gmail.com',
                // pass: 'pkcs-vqnp-ykxs-vabc',
    
            // },
            logger: false
        });
        
    await client?.connect();
    return client
    }
    catch(error:any){
        console.log(error)
        console.log("Likely missing Gmail IMAP scope - user must re-authenticate");
        console.log("client is logout and not able make persistsant connection")
        
        if (client) {
            try { await client.logout(); } catch {}
        }
        return null; 
    }
    }

export default createIMAPConnection