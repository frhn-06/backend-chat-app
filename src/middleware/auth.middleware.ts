import { NextFunction, Request, Response } from "express";
import response from "../utils/response";
import { getUserByToken } from "../utils/jwt";
import { IReqUser } from "../types/user";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorize = req.headers.authorization;

    if(!authorize) {
        return response.unauthorize(res);
    }

    const [bearer, token] = authorize.split(" ");

    if(bearer !== "Bearer") {        
        return response.unauthorize(res);
    }

    if(!token) {
        return response.unauthorize(res);
    }

    const result = getUserByToken(token);

    (req as unknown as IReqUser).user = result;

    next();
}

export default authMiddleware