import { Response } from "express";
import { IReqUser } from "../types/user";
declare const conversationController: {
    findAll(req: IReqUser, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    findById(req: IReqUser, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    findByParticipants(req: IReqUser, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
export default conversationController;
//# sourceMappingURL=conversation.controller.d.ts.map