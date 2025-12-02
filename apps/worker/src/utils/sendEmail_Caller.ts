import dotenv from 'dotenv';
import sendMailThroughGoogleAPI from './sendMail.js';
import getAccessToken from './getAccessToken.js';
import redisClient from 'redisclient'
import { Mail, queueData } from 'types'
import { prisma } from 'prisma'

import { google_API_SendMessage_Response } from 'types'
let retryCount = 3
dotenv.config();
let mailRes: google_API_SendMessage_Response
async function sendEmail(msg: string) {
  try {
    const redis = await redisClient()
    let accessToken: string
    const { message, userId } = JSON.parse(msg) as queueData
    accessToken = (await redis.get(`${userId}-access_token`) as string) || (await prisma.user.findUnique({ where: { id: userId }, select: { accessToken: true } }))?.accessToken!
    const { from, to, subject, body, tag, uuid, parentMailId, attachments } = message
    try {
      mailRes = await sendMailThroughGoogleAPI(from, to, subject, accessToken, body)
      let parentMail = null
      let references = ""
      let inReplyTo = ""
      let conversationId = ""

      // if the mail has the replay then consider it has parent of the current replay
      // send the main thread Id for easy look up and thread formation as conversationId
      // Reference is the list previous references `mailId-> replay 1-replay 2 ...`
      if (parentMailId) {
        parentMail = await prisma.mail.findUnique({ where: { id: parentMailId } });
        if (parentMail) {
          inReplyTo = parentMail.messageId
          conversationId = parentMail.conversationId!
          references = parentMail.references
            ? `${parentMail.references} ${parentMail.messageId}`
            : parentMail.messageId;
        }
      }

      // Store Mail in Postgres
      const createdMail = await prisma.mail.create({
        data: {
          userId,
          from,
          to,
          subject,
          body,
          status: "SENT",
          messageId: mailRes.id,
          uuid: uuid,
          parentMailId,
          conversationId,
          inReplyTo,
          references,
        },
      });

      if (attachments.length > 0) {
        const attachmentData = attachments.map(a => ({
          mailId: createdMail.id,
          link: a,
        }));
        await prisma.attachment.createMany({ data: attachmentData });
      }
    }
    // call the refreshAcces token api when access_tken expires
    catch (error: any) {
      retryCount = -1
      while (retryCount > 0) {

        if (error.response.status == 401) {
          const data = await getAccessToken(userId)
          if (data) {
            mailRes = await sendMailThroughGoogleAPI(from, to, subject, data.accessToken!, body)

          }
          else {
            retryCount += -1
          }
        }
      }
    }

    // use ai to add the tag to mail and push to worker queue
    // baed on the response we can trigger the webhook to send replay mail
  }
  catch (error: any) {
    throw new Error("Unexpected error occured")
  }
}

export default sendEmail