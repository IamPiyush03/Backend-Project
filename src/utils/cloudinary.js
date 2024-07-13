import { v2 as cloudinary} from "cloudinary";
import { response } from "express";
import fs from "fs"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET// Click 'View Credentials' below to copy your API secret
});


const uploadONCloudinary= async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        //upload file on cloudinary
        cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto",           
        }),
        //file  upload successfully
        console.log("file is uploaded successfully",response.url);
        return response;  
    } catch (error) {
       fs.unlinkSync(localFilePath) //remove the locally saved temp file as the upload file failed
    }
}