import {Request,Response} from 'express';
import  fs from 'fs';
import path from 'path'
import multer, { FileFilterCallback } from "multer";
import { fileURLToPath } from "url";
const storage = multer.memoryStorage()

const allowedMimes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
interface MulterRequest extends Request {
  files: Express.Multer.File[]
}
const upload:any  = multer({
  storage: storage,
  limits: { fileSize: 6 * 1024 * 1024 }, // 6MB
  fileFilter: (
    req: MulterRequest,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only docs, pdf, and images are allowed!"));
    }
  },
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
export default upload
export {uploadDir}