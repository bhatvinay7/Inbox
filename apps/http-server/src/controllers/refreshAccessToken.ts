import axios from "axios";

async function refreshAccessToken(refreshToken: string) {
  const url = "https://oauth2.googleapis.com/token";

  const body = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  };
 
  const response = await axios.post(url, body, {
    headers: { "Content-Type": "application/json" }
  });

  return response.data.access_token;
}
export default refreshAccessToken