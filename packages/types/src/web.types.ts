import {Request} from 'express'
export interface AuthRequest extends Request {
  user?: {
        userId: string,
        username: string,
        email:string,
        picture: string,
        token:string,
        isVerified: boolean,       
      }
}

export interface userCredentials{
userId: string,
username: string,
picture: string,
token:string,
email: string,
isVerified: boolean,
}

export interface Mail{
    userId: string,
    uuid:string,
    uid:number,
    subject:string,
    from:string,
    to:string,
    status: string,
    date:string,
    tag:string,
    messageId:string,
    gmailLabels?:string[],
    raw: string,
    body: string, 
    attachments:string[],
    parentMailId:string
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
  historyId: string,
  internalDate: string,
  sizeEstimate:number,
  raw: null
}

export interface userData{
  userId:string,
  user_email:string,
  accessToken: string
}

export interface attachment{
  uuid:string,
  link:string,
  progress:string,
  status?:string
}

interface file{
    uuid:string,
    isLoading:boolean,
    error:boolean,
    link:string,

}
interface mail{
  to:string,
  subject:string,
  body:string
}

export type GoogleUser = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
};

export type SelectedUser = Pick<
  GoogleUser,
  "access_token" | "name" | "refresh_token" | "picture"| "email"
>;
