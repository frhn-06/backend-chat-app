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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateInfo = exports.loginDTO = exports.userDTO = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const yup = __importStar(require("yup"));
const encrypt_1 = __importDefault(require("../utils/encrypt"));
const nodemailer_1 = require("../utils/mail/nodemailer");
const env_1 = require("../utils/env");
const yupPassword = yup.string()
    .min(4, "must be as least a 4 characters long")
    .test("capital", "password must be capital", (value) => {
    if (!value)
        return false;
    const regex = /^(?=.*[A-Z])/;
    return regex.test(value);
})
    .test("number", "password must be number", (value) => {
    if (!value)
        return false;
    const regex = /^(?=.*\d)/;
    return regex.test(value);
}).required();
const yupConfirmPassword = yup.string().oneOf([yup.ref("password"), ""], "password not match").required();
exports.userDTO = yup.object({
    userName: yup.string().required(),
    fullName: yup.string().required(),
    email: yup.string().required(),
    password: yupPassword,
    confirmPassword: yupConfirmPassword,
});
exports.loginDTO = yup.object({
    identifier: yup.string().required(),
    password: yup.string().required()
});
exports.userUpdateInfo = yup.object({
    userName: yup.string().optional(),
    fullName: yup.string().optional()
});
const schema = mongoose_1.default.Schema;
const schemaUser = new schema({
    userName: {
        type: schema.Types.String,
        required: true,
        unique: true
    },
    fullName: {
        type: schema.Types.String,
        required: true
    },
    email: {
        type: schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: schema.Types.String,
        required: true
    },
    avatar: {
        type: schema.Types.String,
    },
    isOnline: {
        type: schema.Types.Boolean,
        default: false
    },
    lastSeen: {
        type: schema.Types.String,
    },
    isActive: {
        type: schema.Types.Boolean,
        default: false
    },
    activationCode: {
        type: schema.Types.String
    }
}, {
    timestamps: true
});
schemaUser.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = (0, encrypt_1.default)(user.password);
        user.activationCode = (0, encrypt_1.default)(`${user._id}`);
    });
});
schemaUser.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = doc;
            const html = yield (0, nodemailer_1.renderHtml)("mail-activation.ejs", {
                title: "Chat App",
                userName: user.userName,
                fullName: user.fullName,
                email: user.email,
                link: `${env_1.CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
                tanggal: user.createdAt
            });
            yield (0, nodemailer_1.sendMail)({
                from: env_1.MY_EMAIL,
                to: user.email,
                subject: "Aktivasi Akun",
                html: html
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            next();
        }
    });
});
schemaUser.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
schemaUser.index({
    userName: "text",
    fullName: "text"
});
const UserModel = mongoose_1.default.model("User", schemaUser);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map