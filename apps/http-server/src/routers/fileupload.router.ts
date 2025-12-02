import express,{Router} from 'express';
import {upploadFileBuffer, uploadFile} from '../controllers/uploadfile.js';
import upload from '../utils/file_upload.js'
const router :Router= express.Router();
router.post('/upploadFileBuffer',upload.single("chunk"), upploadFileBuffer);
router.post('/uploadFile', uploadFile);
export default router

