import { Response } from "express";
import { IReqUser } from "../types/user";
declare const messageController: {
    create(req: IReqUser, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    findByTargetId(req: IReqUser, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    findByConversation(req: IReqUser, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
export default messageController;
//# sourceMappingURL=message.controller.d.ts.map