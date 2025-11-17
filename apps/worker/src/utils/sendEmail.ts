import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
interface message{
  from: string, 
  to: string,
  subject: string,
  content: string,
  accessToken: string,
  tag:string
}
async function sendEmail(message:string){
     try{
    const {from,to,subject,content,accessToken,tag}=JSON.parse(message) as message;

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
      `https://gmail.googleapis.com/gmail/v1/users/${email}/messages/send`,
      {

        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw: base64Url }),
      }
    );

    const data = await res.json();
    
     // use ai to add the tag to mail and push to worker queue
     // baed on the response we can trigger the webhook to send replay mail

    const response = await axios.post(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${data.id}/modify`,
      {
        addLabelIds: ["Label_123"],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
     }
     catch(error:any){

     }
}
