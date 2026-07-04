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
const response_1 = __importDefault(require("../utils/response"));
const message_model_1 = __importStar(require("../models/message.model"));
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const mongoose_1 = __importStar(require("mongoose"));
const index_1 = require("../index");
const messageController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    return response_1.default.unauthorize(res);
                const { targetId, text, image } = req.body;
                if (!(0, mongoose_1.isValidObjectId)(targetId))
                    return response_1.default.notFound(res, "target is not found");
                yield message_model_1.messageDTO.validate(Object.assign(Object.assign({ targetId }, (text && { text })), (image && { image })));
                const senderObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const targetObjectId = new mongoose_1.default.Types.ObjectId(targetId);
                let conversation = yield conversation_model_1.default.findOne({
                    participants: { $all: [senderObjectId, targetObjectId] }
                });
                if (!conversation) {
                    conversation = yield conversation_model_1.default.create({ participants: [senderObjectId, targetObjectId] });
                }
                const result = yield message_model_1.default.create({ conversationId: conversation._id, senderId: senderObjectId, text: text, image: image });
                const newConversation = yield conversation_model_1.default.findByIdAndUpdate(conversation._id, {
                    lastMessage: {
                        text: text,
                        senderId: senderObjectId
                    }
                }, {
                    new: true
                }).populate("participants", "userName avatar").exec();
                const receiverId = targetObjectId.toString();
                const userStringId = userId.toString();
                const socketTargetId = index_1.users[receiverId];
                const socketUserId = index_1.users[userStringId];
                // if(socketTargetId) {
                //     io.to(socketTargetId).emit("newMessage", result)
                // }
                // if(socketTargetId && userId) {
                //     io.to(socketTargetId).emit("newConversation", newConversation);
                //     io.to(socketUserId).emit("newConversation", newConversation);
                // }
                response_1.default.success(res, result, "success to create message");
            }
            catch (error) {
                return response_1.default.error(res, null, "failed to create message");
            }
        });
    },
    findByTargetId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { targetId } = req.params;
                if (!((0, mongoose_1.isValidObjectId)(userId) && (0, mongoose_1.isValidObjectId)(targetId))) {
                    return response_1.default.error(res, null, "data id tidak ada");
                }
                let conversation = yield conversation_model_1.default.findOne({
                    participants: {
                        $all: [userId, targetId]
                    }
                });
                if (!conversation) {
                    return response_1.default.success(res, {
                        conversationId: null,
                        messages: []
                    }, "conversation masih koosng");
                }
                const result = yield message_model_1.default.find({
                    conversationId: conversation._id
                }).populate("senderId", "userName avatar").sort({ createdAt: 1 }).exec();
                response_1.default.success(res, {
                    conversationId: conversation._id,
                    messages: result
                }, "success to find message by targetId");
            }
            catch (error) {
                return response_1.default.error(res, null, "failed to find message by taretId");
            }
        });
    },
    findByConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    return response_1.default.unauthorize(res);
                const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const { conversationId } = req.params;
                if (!(0, mongoose_1.isValidObjectId)(conversationId))
                    return response_1.default.notFound(res, "message not found");
                const conversationObjectId = new mongoose_1.default.Types.ObjectId(`${conversationId}`);
                const conversation = yield conversation_model_1.default.findOne({ _id: conversationObjectId, participants: { $in: [userObjectId] } });
                if (!conversation)
                    return response_1.default.notFound(res, "conversation not found");
                const result = yield message_model_1.default.find({ conversationId: conversationObjectId }).populate("senderId", "userName avatar").sort({ createdAt: 1 }).exec();
                response_1.default.success(res, result, "success to find message by conversation");
            }
            catch (error) {
                return response_1.default.error(res, null, "failed to find messae by conversation");
            }
        });
    }
};
exports.default = messageController;
//# sourceMappingURL=message.controller.js.map