// @ts-nocheck
type userData={
    userId:string,
    email:string,
    accessToken:string
}
import fetchLatestEmails from './pull_user_mails.js'
function startIdleListener(user:userData, client,connections:Map<string,any>) {
    client?.on("exists", async () => {
        await fetchLatestEmails(user, client)
    });
    client?.on("expunge", async (msg) => {
        console.log(`Mail deleted for ${user.email}`);
        // await handleDelete(user, msg);
    });

    (async function idleLoop() {
        while (true) {
            try {
                await client?.idle({ timeout: 1000 * 60 * 20 }); 
            } catch (err:any) {
                console?.error("Idle error, reconnecting...", err);
                try {
                    // Attempt reconnect
                    await client?.connect();
                } catch (reErr:any) {
                    connections.delete(user.userId)
                    throw reErr
                }
            }
        }
    })();
}

export default startIdleListener