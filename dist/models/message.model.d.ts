import mongoose, { Types } from 'mongoose';
import * as yup from 'yup';
export declare const messageDTO: yup.ObjectSchema<{
    targetId: string;
    text: string | undefined;
    image: string | undefined;
}, yup.AnyObject, {
    targetId: undefined;
    text: undefined;
    image: undefined;
}, "">;
export type IMessageForm = yup.InferType<typeof messageDTO>;
export interface IMessage extends Omit<IMessageForm, "targetId"> {
    conversationId: Types.ObjectId;
    senderId: Types.ObjectId;
    status: "terkirim" | "tersampaikan" | "dibaca";
    image?: string;
}
declare const MessageModel: mongoose.Model<IMessage, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IMessage, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IMessage & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<IMessage, mongoose.Model<IMessage, any, any, any, (mongoose.Document<unknown, any, IMessage, any, mongoose.DefaultSchemaOptions> & IMessage & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, IMessage, any, mongoose.DefaultSchemaOptions> & IMessage & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, IMessage>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IMessage, mongoose.Document<unknown, {}, IMessage, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IMessage & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    conversationId?: mongoose.SchemaDefinitionProperty<Types.ObjectId, IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IMessage & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    senderId?: mongoose.SchemaDefinitionProperty<Types.ObjectId, IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IMessage & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: mongoose.SchemaDefinitionProperty<"terkirim" | "tersampaikan" | "dibaca", IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IMessage & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    image?: mongoose.SchemaDefinitionProperty<string | undefined, IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IMessage & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    text?: mongoose.SchemaDefinitionProperty<string | undefined, IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IMessage & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IMessage>, IMessage>;
export default MessageModel;
//# sourceMappingURL=message.model.d.ts.map