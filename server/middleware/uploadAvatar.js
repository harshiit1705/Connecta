import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "avatar",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        transformation: [
            { width: 300, height: 300, crop: "fill", gravity: "face" }
        ],
    },
});

const uploadAvatar = multer({ storage });

export default uploadAvatar;