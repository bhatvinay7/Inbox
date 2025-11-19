import axios from 'axios'
import {google_API_SendMessage_Response} from 'types'
async function sendMailThroughGoogleAPI(from:string,subject:string,accessToken:string):Promise<google_API_SendMessage_Response>{
const rawEmail =
  `From:${from} \r\n` +
  `To: ${to}\r\n` +
  `Subject: ${subject}\r\n\r\n` +
  `${content}`;
const base64Url = Buffer.from(rawEmail)
  .toString("base64")
  .replace(/\+/g, "-")
  .replace(/\//g, "_");
const res = await axios.post(
  `https://gmail.googleapis.com/gmail/v1/users/${from}/messages/send`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: base64Url }),
  }
);
return (res as {data:google_API_SendMessage_Response}).data
}

export default sendMailThroughGoogleAPI