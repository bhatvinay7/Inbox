import {v2 as cloudinary,UploadApiResponse} from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!
});

export async function uploadFileToCloudinary(filepath: string): Promise<UploadApiResponse> {
  try {
    const result = await cloudinary.uploader.upload(filepath);
    return result;
  } catch (error: any) {
    throw new Error(`Error while uploading the file: ${error.message || error}`);
  }
}
 export default uploadFileToCloudinary