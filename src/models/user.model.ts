import mongoose, { mongo } from "mongoose";
import * as yup from 'yup';
import encrypt from "../utils/encrypt";
import { NextFunction } from "express";


const yupPassword = yup.string()
        .min(4, "must be as least a 4 characters long")
        .test("capital", "password must be capital", (value) => {
            if(!value) return false;
            const regex = /^(?=.*[A-Z])/;
            return regex.test(value);
        })
        .test("number", "password must be number", (value) => {
            if(!value) return false;
            const regex = /^(?=.*\d)/;
            return regex.test(value)
        }).required();

const yupConfirmPassword = yup.string().oneOf([yup.ref("password"), ""], "password not match").required();

export const userDTO = yup.object({
    userName: yup.string().required(), 
    fullName: yup.string().required(), 
    email: yup.string().required(),
    password: yupPassword, 
    confirmPassword: yupConfirmPassword, 
});


export type IUserForm = yup.InferType<typeof userDTO>;

interface IUser extends Omit<IUserForm, "confirmPassword"> {
    isActive: boolean;
    activationCode: string;
    avatar: string;
    isOnline: boolean;
    lastSeen?: Date;
}


const schema = mongoose.Schema;
const schemaUser = new schema<IUser>({
    userName: {
        type: schema.Types.String,
        required: true,
        unique: true
    },
    fullName: {
        type: schema.Types.String,
        required: true
    },
    email: {
        type: schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: schema.Types.String,
        required: true
    },
    avatar: {
        type: schema.Types.String,
        default: ""
    },
    isOnline: {
        type: schema.Types.Boolean,
        default: false
    },
    lastSeen: {
        type: schema.Types.String,
    },
    isActive: {
        type: schema.Types.Boolean,
        default: false
    },
    activationCode: {
        type: schema.Types.String
    }
}, {
    timestamps: true
});



schemaUser.pre("save", async function () {
  const user = this as any;

  user.password = encrypt(user.password);
  user.activationCode = encrypt(`${user._id}`);
});



schemaUser.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
}

const UserModel = mongoose.model("User", schemaUser);

export default UserModel;