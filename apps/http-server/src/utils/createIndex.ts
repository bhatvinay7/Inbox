import client from 'elastic-search'
import dotenv from 'dotenv'
dotenv.config()
const INDEX_NAME = 'emails';

export async function createEmailIndex() {
  try {
    const indexExists = await client.indices.exists({ index: INDEX_NAME });
    if (indexExists) {
      console.log(`Index "${INDEX_NAME}" already exists.`);
      return;
    }
    await client.indices.create({
      index: INDEX_NAME,
      mappings: {
        properties: {
          uuid:  { type: 'keyword' },
          uid: { type: 'keyword' },
          conversationId:{type:'keyword'},
          messageId: { type: 'keyword' },
          inReplyTo: { type: 'keyword' },
          references: { type: 'keyword' },
          parentId: { type: 'keyword' },
          subject: { type: 'text' },
          from: { type: 'text' },
          to: { type: 'text' },
          date: { type: 'date' },
          body: { type: 'text' },
          gmailLabels: { type: 'keyword' },
          createdAt: { type: 'date' },
          attachments: { type: 'keyword' },
          delete: { type: 'keyword' },
          isMarked : { type: 'keyword' }
        },
      },
    });

    console.log(`Index "${INDEX_NAME}" created successfully.`);
  } catch (error: any) {
    console.error(`Error creating index: ${error.message}`);
    throw error;
  }
}

export default createEmailIndex;