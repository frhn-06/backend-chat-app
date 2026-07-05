import { Request, Response } from "express";
import response from '../utils/response';
import UserModel, { ILogin, IUser, loginDTO, userDTO, userUpdateInfo } from "../models/user.model";
import encrypt from "../utils/encrypt";
import { getUserByToken, signIn } from "../utils/jwt";
import { IReqUser } from "../types/user";
import { isValidObjectId } from "mongoose";
import upload from "../utils/upload";
import db from "../utils/db";


const authController = {
    async register(req:Request, res:Response) {
        try {
            const {userName, fullName, email, password, confirmPassword} = await userDTO.validate(req.body);

            const result = await UserModel.create({userName, fullName, email, password});

            response.success(res, result, "success to register");

        } catch(error) {
            response.error(res, error, "failed to register");
        }
    },

    async activation(req: Request, res:Response) {
        try {
            const {code} = req.body;
            const result = await UserModel.findOneAndUpdate({
                activationCode: code
            }, {
                isActive: true
            }, {
                new: true
            });

            if(!result) {
                return response.notFound(res, "user not found");
            }

            response.success(res, result, "success to activation");

        } catch(error) {
            response.error(res, error, "failed to activation")
        }
    },

    async login(req: Request, res: Response) {
        try {
            await db();

            console.log("okeeee");

            const {identifier, password} = req.body as ILogin;


            await loginDTO.validate({identifier, password});

            const data = await UserModel.findOne({
                $or : [
                    {
                        email: identifier
                    },
                    {
                        userName: identifier
                    }
                ],
                isActive: true
            });

            if(!data) {
                return response.notFound(res, "user not found");
            }

            
            const passwordMatch: boolean = data.password === encrypt(password);
            if(!passwordMatch) {
                return response.error(res, "failed password","your password is wrong");
            }
        
            const token = signIn({
                id: data._id
            });

            response.success(res, token, "user success to login");
            
        } catch (error) {
            response.error(res, error, "failed to login")
        }
    },

    async me(req: IReqUser, res: Response) {
        try{
            const user = await UserModel.findById(req.user?.id);
    
            if(!user) return response.unauthorize(res);
    
            response.success(res, user, "success to get me");
        }catch(error) {
            response.error(res, error, "failed to get me");
        }
    },

    async findUser(req: IReqUser, res: Response) {
        try{
            const {userId} = req.params;

            if(!isValidObjectId(userId)) {
                return response.notFound(res, "user not found");
            }

            const result = await UserModel.findById(userId);

            if(!result) {
                return response.notFound(res, "user not found");
            }

            response.success(res, result, "success to get user by id")

        }catch(error) {
            response.error(res, error, "failed to get user by id");
        }
    },

    async searchByName(req: IReqUser, res: Response) {
        try {
            const userId = req.user?.id;
            if(!isValidObjectId(userId)) return response.unauthorize(res);

            const {name} = req.params;

            const filter = {
                _id: {$ne: userId},
                userName: {$regex: name, $options: "i"},
                isActive: true
            } as any;

            const user = await UserModel.find(filter).limit(3).exec();

            if(!user) return response.error(res, null, "user is not found");

            response.success(res, user, "success to search user");

            
        } catch(error) {
            response.error(res, error, "failed to search user");
        }
    },

    async addAvatar(req:IReqUser, res:Response) {
        try {
            const userId = req.user?.id;
            if(!isValidObjectId(userId)) return response.unauthorize(res);

            const file = req.file;
            if(!file) {
                return response.error(res, new Error("file tidak ditemukan"), "file tidak ditemukan");
            }

            let user = await UserModel.findById(userId);
            
            const resultUpload = await upload.uploadSingle(file);
            
            if(user?.avatar && user.avatar !== resultUpload.secure_url) {
                await upload.remove(user?.avatar)
            } 
            
            const result = await UserModel.findByIdAndUpdate(userId, {
                avatar: resultUpload.secure_url
            }, {
                new: true
            })

            response.success(res, result, "success to addAvatar")

            
        } catch(error) {
            response.error(res, error, "failed to add avatar");
        }
    },

    async removeAvatar(req:IReqUser, res:Response) {
        try {
            const userId = req.user?.id;
            if(!isValidObjectId(userId)) return response.unauthorize(res);

            const user = await UserModel.findById(userId);
            const oldAvatar = user?.avatar

            if(!oldAvatar) {
                return response.error(res, new Error("file tidak sesuai"), "file yg dikirim tidak sesuai");
            }
            
            await upload.remove(oldAvatar);

            const result = await UserModel.findByIdAndUpdate(userId, {
                $unset: {
                    avatar : ""
                }
            }, {
                new: true
            });

            response.success(res, result, "success to remove avatar");

            
        } catch(error) {
            response.error(res, error, "failed to remove avatar");
        }
    },

    async updateInfo(req:IReqUser, res:Response) {
        try {
            const userId = req.user?.id;
            if(!userId) {
                return response.unauthorize(res);
            }
    
            const {userName, fullName} = req.body as {userName: string; fullName: string}

            const validate = await userUpdateInfo.validate({userName, fullName});

            const result = await UserModel.findByIdAndUpdate(userId, validate, {new:true})

            response.success(res, result, "success to update info");

        } catch(error) {
            response.error(res, error, "failed to update info");
        }
    }

    // async updateAvatar(req: IReqUser, res: Response) {
    //     try {
    //         const userId = req.user?.id;
    //         if(!isValidObjectId(userId)) return response.unauthorize(res);

    //         const user = await UserModel.findById(userId);
    //         if(!user) return response.notFound(res, "user not found");

    //         const oldAvatar = user?.avatar;

    //         const {avatar} = req.body as {avatar: string};

    //         const result = await UserModel.findByIdAndUpdate(userId, {
    //             avatar: avatar
    //         }, {
    //             new: true
    //         })

    //         if(oldAvatar && oldAvatar !== avatar) {
    //             await upload.remove(oldAvatar);
    //         }
            
    //         response.success(res, result, "success to update avatar");
    //     } catch(error) {
    //         response.error(res, error, "failed to update avatar")
    //     }
    // },

    // async removeAvatar(req: IReqUser, res: Response) {
    //     try {
    //         const userId = req.user?.id;
    //         if(!isValidObjectId(userId)) return response.unauthorize(res);

    //         const user = await UserModel.findById(userId);
    //         if(!user) return response.notFound(res, "user not found");

    //         const oldAvatar = user.avatar;

    //         const result = await UserModel.findByIdAndUpdate(userId, {
    //             avatar: ""
    //         }, {
    //             new: true
    //         })

    //         await upload.remove(oldAvatar);

    //         response.success(res, result, "success to remove avatar")

    //     }catch(error) {
    //         response.error(res, error, "failed to update avatar")
    //     }
    // }
}

export default authController;