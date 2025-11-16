import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
async function sendEmail(from: string, to: string, subject: string, content: string, accessToken: string) {
  async function sendMail() {
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

}
