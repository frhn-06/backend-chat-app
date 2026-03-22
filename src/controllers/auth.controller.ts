import { Request, Response } from "express";
import response from '../utils/response';
import UserModel, { userDTO } from "../models/user.model";

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
    }
}

export default authController;