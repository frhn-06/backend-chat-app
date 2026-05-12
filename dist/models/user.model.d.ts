import mongoose from "mongoose";
import * as yup from 'yup';
export declare const userDTO: yup.ObjectSchema<{
    userName: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}, yup.AnyObject, {
    userName: undefined;
    fullName: undefined;
    email: undefined;
    password: undefined;
    confirmPassword: undefined;
}, "">;
export declare const loginDTO: yup.ObjectSchema<{
    identifier: string;
    password: string;
}, yup.AnyObject, {
    identifier: undefined;
    password: undefined;
}, "">;
export declare const userUpdateInfo: yup.ObjectSchema<{
    userName: string | undefined;
    fullName: string | undefined;
}, yup.AnyObject, {
    userName: undefined;
    fullName: undefined;
}, "">;
export type IUserForm = yup.InferType<typeof userDTO>;
export type ILogin = {
    identifier: string;
    password: string;
};
export interface IUser extends Omit<IUserForm, "confirmPassword"> {
    isActive: boolean;
    activationCode: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: Date;
    createdAt?: string;
}
declare const UserModel: mongoose.Model<IUser, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IUser, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<IUser, mongoose.Model<IUser, any, any, any, (mongoose.Document<unknown, any, IUser, any, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, IUser, any, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}), any, IUser>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser, mongoose.Document<unknown, {}, IUser, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    isActive?: mongoose.SchemaDefinitionProperty<boolean, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    activationCode?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    avatar?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isOnline?: mongoose.SchemaDefinitionProperty<boolean, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    lastSeen?: mongoose.SchemaDefinitionProperty<Date | undefined, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    createdAt?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    password?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    userName?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fullName?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IUser>, IUser>;
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map