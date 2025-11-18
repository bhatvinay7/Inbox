import axios from 'axios'
async function sendMailThroughGoogleAPI(from:string,subject:string,accessToken:string){
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
  `https://gmail.googleapis.com/gmail/v1/users/${from}/messages/send`
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: base64Url }),
  }
);
return res.data
}

export default sendMailThroughGoogleAPI