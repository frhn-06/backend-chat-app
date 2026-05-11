import {v2 as cloudinary} from 'cloudinary'
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from './env'

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

const toUrl = (file: Express.Multer.File) => {
    const fileBufferBase64 = Buffer.from(file.buffer).toString('base64');
    const result = `data:${file.mimetype};base64,${fileBufferBase64}`;
    return result;
}
// http://res.cloudinary.com/dy5jw1vlj/image/upload/v1777538622/jgu2b2spgu45tzf6ci2o.png

const getPublicId = (url: string) => {
    const pathname = url.substring(url.lastIndexOf("/") + 1);
    const publicId = pathname.substring(0, pathname.lastIndexOf("."));
    return publicId;
}

const upload = {
    uploadSingle: async(file: Express.Multer.File) => {
        const fileUrl = toUrl(file)
        console.log(fileUrl);
        const result = await cloudinary.uploader.upload(fileUrl, {
            resource_type: "auto"
        })
        console.log("result : " + result);
        return result
    },
    remove: async(url: string) => {
        const publicId = getPublicId(url);

        const result = await cloudinary.uploader.destroy(publicId);

        return result;
    }
}

export default upload;