"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("./env");
const encrypt = (teks) => {
    return crypto_1.default.pbkdf2Sync(teks, env_1.SECRET, 100, 64, "sha512").toString("hex");
};
exports.default = encrypt;
//# sourceMappingURL=encrypt.js.map