import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.router.js"
import getUserCredentials from './routers/user.router.js'
import fileuploadRouter from './routers/fileupload.router.js'
import sendMailRouter from './routers/sendMail.router.js'
import fetch_mail_router from './routers/fetch_user_mail.router.js'
import CreateIndex from './utils/createIndex.js'
dotenv.config();
  const app = express();
  const PORT =  3002;

  const options = cors({
    origin: [process.env.NEXT_PUBLIC_FRONTEND_URL!,process.env.IMAP_BACKEND_URL!,process.env.WORKER_BACKEND_URL!],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });
  
    (async ()=>{
    try{
      await CreateIndex()
    }
        catch(error:any){
    console.log("Error while creating index for elasticsearch")
  }
  })()

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(options);
  app.use('/api',authRouter);
  app.use('/api',getUserCredentials)
  app.use('/api',fileuploadRouter)
  app.use('/api',sendMailRouter)
  app.use('/api',fetch_mail_router)
  app.listen(PORT ,"0.0.0.0",() => {
    console.log(`Server running on port ${PORT}`);
  });
