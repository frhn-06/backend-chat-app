import mongoose, { ObjectId, Types } from 'mongoose';


interface IConversation {
    participants: Types.ObjectId[],
    lastMessage: {
        text: string;
        senderId: Types.ObjectId | null
    }
}

const schema = mongoose.Schema;

const schemaConversation = new schema<IConversation>({
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


schemaConversation.index({participants: 1})

const ConversationModel = mongoose.model("Conversation", schemaConversation);

export default ConversationModel;