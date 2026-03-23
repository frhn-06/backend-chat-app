import { Types } from "mongoose";
import { IUser } from "../models/user.model";
import { Request } from "express";

interface IUserToken extends Omit<IUser, "userName" | "fullName" | "email" | "isActive" | "avatar" | "password" | "activationCode" | "isOnline"> {
    id: Types.ObjectId;
}

interface IReqUser extends Request {
    user?: IUserToken;
}

export {IUserToken, IReqUser}