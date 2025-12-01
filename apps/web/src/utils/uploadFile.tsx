import axiosPublic from "../lib/axios";
interface response {
    message: string,
    uuid:string,
    processedChunks?:string
}
export async function uploadFIleBuffer(uuid:string,file:File): Promise<response> {
    try {
        const chunkSize = 20 * 1024
        const totalChunks = Math.ceil(file.size / chunkSize);
        let response:any
        for (let index = 0; index < totalChunks; index++) {
         const start = index * chunkSize;
         const end = Math.min(file.size, start + chunkSize);
         const chunk = file.slice(start, end);
         console.log((((index + 1) / totalChunks) * 100))
         const formData = new FormData();
         formData.append("chunk", chunk);
         formData.append("fileName", file.name);
         formData.append("index", ""+index);
         formData.append("totalChunks", ""+totalChunks);
         response = await axiosPublic.post(`/api/uploadFileBuffer?uuid=${encodeURIComponent(uuid)}`,formData ,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        )
    }
    const result=(response as {data:response}).data
    if(parseInt(result.processedChunks!)  !=totalChunks)
        throw new Error("Error while uploading the fule")
    return (response as {data:response}).data
}
    catch (error: any) {
        throw new Error(JSON.stringify({ message: error.message }))
    }
}

export async function uploadFile( filePath:string,uuid:string ): Promise<response> {
    try {
        const response = await axiosPublic.post(`/api/uploadFile`, { filePth: filePath,uuid:uuid })
        return response.data
    }
    catch (error: any) {
        throw new Error(JSON.stringify({ message: error.message }))
    }
}