import dotenv from 'dotenv'
dotenv.config()
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import fs from "fs"
import path from "path"

const s3 = new S3Client({
  region: process.env.AWS_REGION1,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  }
});

export async function uploadFileToS3(filePath:string) {
   try{
  const fileStream = fs.createReadStream(filePath)
  const fileName = path.basename(filePath)

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
      Body: fileStream,
      ACL: "public-read",
    })
  );


  return `https://${process.env.AWS_BUCKET!}.s3.${process.env.AWS_REGION!}.amazonaws.com/${fileName}`;
  }
  catch(error:any){
     throw new Error("Error while uploading the file")
  }
}
