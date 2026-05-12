import mongoose, { Types } from 'mongoose';
interface IConversationOnCreate {
    participants: Types.ObjectId[];
}
interface IConversation extends Omit<IConversationOnCreate, ""> {
    lastMessage: {
        text: string;
        senderId: Types.ObjectId;
    };
}
declare const ConversationModel: mongoose.Model<IConversation, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IConversation, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IConversation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<IConversation, mongoose.Model<IConversation, any, any, any, (mongoose.Document<unknown, any, IConversation, any, mongoose.DefaultSchemaOptions> & IConversation & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, IConversation, any, mongoose.DefaultSchemaOptions> & IConversation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, IConversation>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IConversation, mongoose.Document<unknown, {}, IConversation, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IConversation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    lastMessage?: mongoose.SchemaDefinitionProperty<{
        text: string;
        senderId: Types.ObjectId;
    }, IConversation, mongoose.Document<unknown, {}, IConversation, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IConversation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    participants?: mongoose.SchemaDefinitionProperty<Types.ObjectId[], IConversation, mongoose.Document<unknown, {}, IConversation, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IConversation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IConversation>, IConversation>;
export default ConversationModel;
//# sourceMappingURL=conversation.model.d.ts.map