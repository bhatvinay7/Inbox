import {Request} from 'express'
export interface AuthRequest extends Request {
  user?: {
        userId: string;
        username: string;
        picture: string;
        google_access_token: string;
        isVerified: boolean;       
      }
}

export interface userCredentials{
userId: string,
username: string,
picture: string,
google_access_token: string,
google_refresh_token: string,
email: string,
isVerified: boolean,

}

export interface Mail{
    uid:number;
    subject:string;
    from:string;
    to:string[];
    date:string;
    body:string;
    gmailLabels:string[];
}

export interface  queueData {
  userId:string,
  message:Mail
}

export interface google_API_SendMessage_Response{
  id: string, 
  threadId: string,
  labelIds: [string],
  snippet: string,
  historyId: strstring
  internalDate: string,
  sizeEstimate:number,
  raw: null
}
