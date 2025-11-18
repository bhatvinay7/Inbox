import client from 'elsesticsearch';

export async function pushMailToElesticSearch(mailData:string){
    try{   
        const mailObject=JSON.parse(mailData);  
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