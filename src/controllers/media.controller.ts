import { Request, Response } from "express";
import response from "../utils/response";
import upload from "../utils/upload";

const mediaController = {
    single: async (req: Request, res: Response) => {
        try {
            const file = req.file;
            if(!file) {
                return response.error(res, null, "file tidak ditemukan");
            }

            const result = await upload.uploadSingle(file);
            response.success(res, result, "success");

        } catch(error) {
            response.error(res, null, "failed to upload a photo")
        }
    },

    remove: async(req: Request, res: Response) => {
        try{
            const {fileUrl} = req.body;
            
            const result = await upload.remove(fileUrl);

            response.success(res, result, "success to remove a photo");

        }catch(error) {
            response.error(res, null, "failed to remove a photo")
        }
    }
}

export default mediaController;