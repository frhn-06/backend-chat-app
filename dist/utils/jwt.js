"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByToken = exports.signIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./env");
const signIn = (user) => {
    const token = jsonwebtoken_1.default.sign(user, env_1.SECRET, {
        expiresIn: "1h"
    });
    return token;
};
exports.signIn = signIn;
const getUserByToken = (token) => {
    const result = jsonwebtoken_1.default.verify(token, env_1.SECRET);
    return result;
};
exports.getUserByToken = getUserByToken;
//# sourceMappingURL=jwt.js.map