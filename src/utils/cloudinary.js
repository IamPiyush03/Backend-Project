import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadONCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log("file is uploaded successfully", response.url);
        fs.unlinkSync(localFilePath); // remove the locally saved temp file after upload
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temp file as the upload failed
        console.error("Cloudinary upload error:", error);
        throw new Error("File upload to Cloudinary failed");
    }
};

export { uploadONCloudinary };
