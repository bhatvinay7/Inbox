import axios from 'axios'

async function addCustomTagToMail(accessToken:string,id:string){
    const response = await axios.post(
   `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/modify`,
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
 return response.data   
}

export default  addCustomTagToMail