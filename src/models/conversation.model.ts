import mongoose, { ObjectId, Types } from 'mongoose';


interface IConversationOnCreate {
    participants: Types.ObjectId[],
}

interface IConversation extends Omit<IConversationOnCreate, ""> {
    lastMessage: {
        text: string;
        senderId: Types.ObjectId;
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