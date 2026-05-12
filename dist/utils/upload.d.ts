declare const upload: {
    uploadSingle: (file: Express.Multer.File) => Promise<import("cloudinary").UploadApiResponse>;
    remove: (url: string) => Promise<any>;
};
export default upload;
//# sourceMappingURL=upload.d.ts.map