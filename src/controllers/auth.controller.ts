import { Request, Response } from "express";
import response from '../utils/response';
import UserModel, { ILogin, IUser, loginDTO, userDTO } from "../models/user.model";
import encrypt from "../utils/encrypt";
import { getUserByToken, signIn } from "../utils/jwt";
import { IReqUser } from "../types/user";
import { isValidObjectId } from "mongoose";


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
                return response.error(res, null, "user not found");
            }

            
            const passwordMatch: boolean = data.password === encrypt(password);
            if(!passwordMatch) {
                return response.error(res, null,"your password is wrong");
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
            response.error(res, null, "failed to get me");
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
            response.error(res, null, "failed to get user by id");
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
            response.error(res, null, "failed to search user");
        }
    }
}

export default authController;