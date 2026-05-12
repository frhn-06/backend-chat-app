"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.CLIENT_HOST = exports.MY_EMAIL = exports.EMAIL_PASSWORD = exports.SECRET = exports.DATABASE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DATABASE_URL = process.env.DATABASE_URL || "";
exports.SECRET = process.env.SECRET || "";
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD_APP || "";
exports.MY_EMAIL = process.env.MY_EMAIL || "";
exports.CLIENT_HOST = process.env.CLIENT_HOST || "";
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "";
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "";
//# sourceMappingURL=env.js.map