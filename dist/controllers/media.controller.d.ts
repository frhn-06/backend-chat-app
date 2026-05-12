import { Request, Response } from "express";
declare const mediaController: {
    single: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    remove: (req: Request, res: Response) => Promise<void>;
};
export default mediaController;
//# sourceMappingURL=media.controller.d.ts.map