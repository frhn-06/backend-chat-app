"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const env_1 = require("./env");
cloudinary_1.v2.config({
    cloud_name: env_1.CLOUDINARY_CLOUD_NAME,
    api_key: env_1.CLOUDINARY_API_KEY,
    api_secret: env_1.CLOUDINARY_API_SECRET
});
const toUrl = (file) => {
    const fileBufferBase64 = Buffer.from(file.buffer).toString('base64');
    const result = `data:${file.mimetype};base64,${fileBufferBase64}`;
    return result;
};
// http://res.cloudinary.com/dy5jw1vlj/image/upload/v1777538622/jgu2b2spgu45tzf6ci2o.png
const getPublicId = (url) => {
    const pathname = url.substring(url.lastIndexOf("/") + 1);
    const publicId = pathname.substring(0, pathname.lastIndexOf("."));
    return publicId;
};
const upload = {
    uploadSingle: (file) => __awaiter(void 0, void 0, void 0, function* () {
        const fileUrl = toUrl(file);
        console.log(fileUrl);
        const result = yield cloudinary_1.v2.uploader.upload(fileUrl, {
            resource_type: "auto"
        });
        console.log("result : " + result);
        return result;
    }),
    remove: (url) => __awaiter(void 0, void 0, void 0, function* () {
        const publicId = getPublicId(url);
        const result = yield cloudinary_1.v2.uploader.destroy(publicId);
        return result;
    })
};
exports.default = upload;
//# sourceMappingURL=upload.js.map