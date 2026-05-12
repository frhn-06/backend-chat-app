"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../utils/response"));
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    const authorize = req.headers.authorization;
    if (!authorize) {
        return response_1.default.unauthorize(res);
    }
    const [bearer, token] = authorize.split(" ");
    if (bearer !== "Bearer") {
        return response_1.default.unauthorize(res);
    }
    if (!token) {
        return response_1.default.unauthorize(res);
    }
    const result = (0, jwt_1.getUserByToken)(token);
    req.user = result;
    next();
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map