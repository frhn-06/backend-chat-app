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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const response_1 = __importDefault(require("../utils/response"));
const mongoose_1 = require("mongoose");
const conversationController = {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    return response_1.default.unauthorize(res);
                const result = yield conversation_model_1.default.find({ participants: { $in: [userId] } }).populate("participants", "userName avatar").populate("lastMessage.senderId", "fullName").sort({ updatedAt: -1 });
                response_1.default.success(res, result, "success to find all conversation");
            }
            catch (error) {
                response_1.default.error(res, null, "failed to find all conversations");
            }
        });
    },
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    return response_1.default.unauthorize(res);
                const { id } = req.params;
                const result = yield conversation_model_1.default.findOne({ _id: id }).populate("participants", "fullName userName avatar");
                if (!result)
                    return response_1.default.notFound(res, "conversation by id not found");
                response_1.default.success(res, result, "success to find a conversation");
            }
            catch (error) {
                response_1.default.error(res, null, "failed to find a conversations");
            }
        });
    },
    findByParticipants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { targetId } = req.params;
                if (!(0, mongoose_1.isValidObjectId)(userId) || !(0, mongoose_1.isValidObjectId)(targetId)) {
                    return response_1.default.error(res, null, "participants is not found");
                }
                const sameId = userId === targetId;
                if (sameId)
                    return response_1.default.error(res, null, "id is same");
                const result = yield conversation_model_1.default.findOne({
                    participants: {
                        $all: [userId, targetId]
                    }
                });
                response_1.default.success(res, result, "success to find a conversation by participants");
            }
            catch (error) {
                response_1.default.error(res, null, "failed to find a conversations by participants");
            }
        });
    }
};
exports.default = conversationController;
//# sourceMappingURL=conversation.controller.js.map