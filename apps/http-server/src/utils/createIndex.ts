import elasticClient from 'elsesticsearch';
import { Request, Response } from 'express';
const INDEX_NAME = 'emails';
async function createEmailIndex(){
    try {
    const indexExists = await elasticClient.indices.exists({ index: INDEX_NAME });
        if (indexExists.body) {
            console.log(`Index "${INDEX_NAME}" already exists.`);
            return;
        }
    await elasticClient.indices.create({
            index: INDEX_NAME,
            mappings: {
                properties: {
                    uid: { type: 'integer',"index": true },
                    subject: { type: 'text',"index": true },
                    from: { type: 'text',"index": true },
                    to: { type: 'text',"index": true },
                    date: { type: 'date' },
                    body: { type: 'text' },
                    gmailLabels: { type: 'keyword',"index": true },
                    created_at: { type: 'date' }
                },
            },
        });
    }
    return 
    catch (error: any) {
        throw new Error(`Error creating index: ${error.message}`);
    }
}
export default createEmailIndex;