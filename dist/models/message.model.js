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
exports.messageDTO = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const yup = __importStar(require("yup"));
exports.messageDTO = yup.object({
    targetId: yup.string().required(),
    text: yup.string().optional(),
    image: yup.string().optional()
}).test("text-or-image", "text or image must be one of", (value) => {
    return !!(value === null || value === void 0 ? void 0 : value.text) || !!(value === null || value === void 0 ? void 0 : value.image);
});
const schema = mongoose_1.default.Schema;
const schemaMessage = new schema({
    conversationId: {
        type: schema.Types.ObjectId,
        required: true,
        ref: "Conversation"
    },
    senderId: {
        type: schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    text: {
        type: schema.Types.String
    },
    status: {
        type: schema.Types.String,
        enum: ["terkirim", "tersampaikan", "dibaca"],
        default: "terkirim"
    },
    image: {
        type: schema.Types.String
    }
}, {
    timestamps: true
});
const MessageModel = mongoose_1.default.model("Message", schemaMessage);
exports.default = MessageModel;
//# sourceMappingURL=message.model.js.map