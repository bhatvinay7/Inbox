import client from 'elastic-search'
import {prisma} from 'prisma'
import getRedisClient from 'redisclient'
import {Mail} from 'types'
export async function pushMailToElesticSearch(userId:string,mailData:Mail){
    try{   
        const redis= await getRedisClient()
        const parentMail = await prisma.mail.findUnique({ where: { messageId: mailData.messageId } })
        await prisma.mail.update({where:{messageId:mailData.messageId},
        data:{
        tag:mailData.tag,
        uid:`${mailData.uid}`,
        raw:mailData.raw, 
        gmailLabels: JSON.stringify(mailData.gmailLabels)
    }
})    
    const mailObject=mailData;  
    const updatedMailObject={...mailObject,references:parentMail?.references,delete:false,isMarked :false}
        const response=await client.index({
            index:'emails',
            body:updatedMailObject
        });
    await redis.LPUSH(`${userId}-emails`,JSON.stringify(updatedMailObject));
    await redis.LTRIM(`${userId}-emails`, 0, 29);
        console.log('Mail pushed to Elasticsearch with ID:', response);
    }   
    catch(error:any){
        console.log('Error pushing mail to Elasticsearch:', error.message);
    }
}

export default pushMailToElesticSearch;    