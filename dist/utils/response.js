"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const yup = __importStar(require("yup"));
const response = {
    success: (res, data, message) => {
        return res.status(200).json({
            meta: {
                status: 200,
                message: message
            },
            data: data
        });
    },
    error: (res, error, message) => {
        console.log(error);
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({
                meta: {
                    status: 400,
                    message: error.message
                },
                data: {
                    [`${error.path}`]: error.errors
                }
            });
        }
        if (error instanceof mongoose_1.default.Error) {
            return res.status(400).json({
                meta: {
                    status: 400,
                    message: error.message
                },
                data: error.name
            });
        }
        if (error.code) {
            return res.status(500).json({
                meta: {
                    status: 500,
                    message: error.errorResponse.errmsg
                },
                data: error
            });
        }
        return res.status(500).json({
            meta: {
                status: 500,
                message: message,
            },
            data: error
        });
    },
    notFound: (res, message) => {
        return res.status(494).json({
            meta: {
                status: 404,
                message: message
            }
        });
    },
    unauthorize: (res) => {
        return res.status(403).json({
            meta: {
                status: 403,
                message: "unauthorized"
            }
        });
    }
};
exports.default = response;
//# sourceMappingURL=response.js.map