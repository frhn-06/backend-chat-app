import { Request, Response } from "express";
import { IReqUser } from "../types/user";
declare const authController: {
    register(req: Request, res: Response): Promise<void>;
    activation(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    me(req: IReqUser, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    findUser(req: IReqUser, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    searchByName(req: IReqUser, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    addAvatar(req: IReqUser, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    removeAvatar(req: IReqUser, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateInfo(req: IReqUser, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
export default authController;
//# sourceMappingURL=auth.controller.d.ts.map