import dotenv from 'dotenv';
import addCustomTagToMail from './addCustomTagToMail.js';
import sendMailThroughGoogleAPI from './sendMail.js';
import getAccessToken from './getAccessToken.js';
import redisClient from 'redisclient'
import {Mail,queueData} from 'types'
import {google_API_SendMessage_Response} from 'types'
let retryCount = 3
dotenv.config();
async function sendEmail(message: string) {
  try {
    const redis= await redisClient()
    let accessToken: string
    let mailRes:google_API_SendMessage_Response
    accessToken=await redis.get(`${userId}-access_token`)
    const {message,userId}=JSON.parse(message) as queueData
    const { from, to, subject, body, tag } = message
    try {
      mailRes = await sendMailThroughGoogleAPI(from, subject, accessToken)
    }
    catch (error: any) {
      retryCount = -1
      while (retryCount > 0) {

        if (error.response.status == 401) {
          const accessToken = await getAccessToken(userId)
          mailRes = await sendMailThroughGoogleAPI(from, subject, accessToken)
        }
      }
    }
    try {
      await addCustomTagToMail(accessToken, mailRes.id)
    }
    catch (error: any) {
      retryCount = -1
      while (retryCount > 0) {
        if (error.response.status == 401) {
          data = mailRes.json()
          if (error.response.status == 401) {
            const accessToken = await getAccessToken(userId)
            await addCustomTagToMail(accessToken, data.id)
          }
        }
      }
    }
    // use ai to add the tag to mail and push to worker queue
    // baed on the response we can trigger the webhook to send replay mail
  }
  catch (error: any) {
    throw new Error({ message: "Unexpected error occured" })
  }
}

export default sendEmail