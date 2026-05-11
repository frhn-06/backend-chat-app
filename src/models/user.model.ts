import mongoose, { mongo } from "mongoose";
import * as yup from 'yup';
import encrypt from "../utils/encrypt";
import { NextFunction } from "express";
import { renderHtml, sendMail } from "../utils/mail/nodemailer";
import { CLIENT_HOST, MY_EMAIL } from "../utils/env";


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

export const loginDTO = yup.object({
    identifier: yup.string().required(),
    password: yup.string().required()
})

export const userUpdateInfo = yup.object({
    userName: yup.string().optional(),
    fullName: yup.string().optional()
})


export type IUserForm = yup.InferType<typeof userDTO>;

export type ILogin = {
    identifier: string;
    password: string;
}

export interface IUser extends Omit<IUserForm, "confirmPassword"> {
    isActive: boolean;
    activationCode: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: Date;
    createdAt?: string; 
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

schemaUser.post("save", async function(doc, next) {
    try {
        const user = doc;
    
        const html = await renderHtml("mail-activation.ejs", {
            title: "Chat App",
            userName: user.userName,
            fullName: user.fullName,
            email: user.email,
            link: `${CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
            tanggal: user.createdAt
        });
    
        await sendMail({
            from: MY_EMAIL,
            to: user.email,
            subject: "Aktivasi Akun",
            html: html
        });
    
    } catch (error) {
        console.log(error);
    } finally {
        next();
    }
})



schemaUser.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
}

schemaUser.index({
    userName: "text",
    fullName: "text"
})

const UserModel = mongoose.model("User", schemaUser);

export default UserModel;