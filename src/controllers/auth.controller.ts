import { Request, Response } from "express";
import response from '../utils/response';
import UserModel, { ILogin, IUser, loginDTO, userDTO } from "../models/user.model";
import encrypt from "../utils/encrypt";
import { getUserByToken, signIn } from "../utils/jwt";
import { IReqUser } from "../types/user";

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
    }
}

export default authController;