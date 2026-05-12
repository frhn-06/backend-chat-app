"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const schemaConversation = new schema({
    participants: {
        type: [schema.Types.ObjectId],
        required: true,
        ref: "User"
    },
    lastMessage: {
        text: {
            type: schema.Types.String,
            default: ""
        },
        senderId: {
            type: schema.Types.ObjectId,
            ref: "User",
            default: null
        }
    }
}, {
    timestamps: true
});
schemaConversation.index({ participants: 1 });
const ConversationModel = mongoose_1.default.model("Conversation", schemaConversation);
exports.default = ConversationModel;
//# sourceMappingURL=conversation.model.js.map