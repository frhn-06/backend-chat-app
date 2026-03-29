import mongoose, { Types } from 'mongoose';
import * as yup from 'yup';

export const messageDTO = yup.object({
    targetId: yup.string().required(),
    text: yup.string().optional(),
    image: yup.string().optional()
}).test("text-or-image", "text or image must be one of", (value) => {
    return !!value?.text || !!value?.image
});

export type IMessageForm = yup.InferType<typeof messageDTO>;

export interface IMessage extends Omit<IMessageForm, "targetId"> {
    conversationId: Types.ObjectId;
    senderId: Types.ObjectId;
    status: "terkirim" | "tersampaikan" | "dibaca";
    image?: string;
}

const schema = mongoose.Schema;

const schemaMessage = new schema<IMessage>({
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
},{
    timestamps: true
});


const MessageModel = mongoose.model("Message", schemaMessage);

export default MessageModel;
