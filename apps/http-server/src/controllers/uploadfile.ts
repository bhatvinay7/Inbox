import { Request, Response } from 'express'
import Multer from 'multer'
import upload, { uploadDir } from '../utils/file_upload.js'
import uploadFIleToCloudinary  from '../utils/uploadFileToCloudinary.js'
import uploadFileToS3 from '../utils/uploadFileToS3.js'
import path from 'path'
import fs from 'fs'

interface MulterRequest extends Request {
  files: Express.Multer.File[]
}

const upploadFileBuffer = async (req: Request, res: Response) => {
    try {
        upload(req, res, (err:any) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            const uuid = decodeURIComponent(req.query.uuid as string)
            const { originalname, buffer } = (req as MulterRequest).files?.[0] as Express.Multer.File;
            const filePath = path.join(uploadDir, originalname) as string;
            fs.appendFileSync(filePath, buffer);
            return res.status(200).json({ message: filePath, uuid: uuid, processeedChunks: req.body.index as string })
        });
    }
    catch (error: any) {
        return res.status(500).json({ message: "Not able process the file" })
    }
};

const uploadFile = async (req: Request, res: Response) => {
    try {
        const filePath = req.body.filePath
        const uuid = req.body.uuid
        if (!filePath) {
            return res.status(400).json({ message: "File path is not provided" })
        }
        const result = await uploadFIleToCloudinary(filePath)

        return res.status(200).json({ message: result, uuid: uuid })
    }
    catch (error: any) {
        return res.status(500).json({ message: "Error occured while creating the link for attachment" })
    }
}
export { upploadFileBuffer, uploadFile }
