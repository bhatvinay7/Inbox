import client from 'elsesticsearch';
import {queueData} from 'types'
export async function pushMailToElesticSearch(mailData:queueData){
    try{   
        const mailObject=mailData;  
        const response=await client.index({
            index:'emails',
            body:mailObject
        });
        console.log('Mail pushed to Elasticsearch with ID:', response.body._id);
    }   
    catch(error:any){
        console.log('Error pushing mail to Elasticsearch:', error.message);
    }
}

export default pushMailToElesticSearch;    