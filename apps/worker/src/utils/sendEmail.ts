import dotenv from 'dotenv';
import addCustomTagToMail from './addCustomTagToMail';
import sendMailThroughGoogleAPI from './sendMail';
import getAccessToken from './getAccessToken';
const retryCount = 3
dotenv.config();
interface message {
  from: string,
  to: string,
  subject: string,
  content: string,
  accessToken: string,
  tag: string
}
async function sendEmail(message: string) {
  try {
    let accessToken: any
    let mailRes: any
    { accessToken }=JSON.parse(message) as message
    const { from, to, subject, content, tag } = JSON.parse(message) as message;
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
      data = mailRes.json()
      const response = addCustomTagToMail(accessToken, data.id)
    }
    catch (error: any) {
      retryCount = -1
      while (retryCount > 0) {
        if (error.response.status == 401) {
          data = mailRes.json()
          if (error.response.status == 401) {
            const accessToken = await getAccessToken(userId)
            const response = await addCustomTagToMail(accessToken, data.id)
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
