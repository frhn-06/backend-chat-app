import { Response } from "express";
declare const response: {
    success: (res: Response, data: any, message: string) => Response<any, Record<string, any>>;
    error: (res: Response, error: unknown, message: string) => Response<any, Record<string, any>>;
    notFound: (res: Response, message: string) => Response<any, Record<string, any>>;
    unauthorize: (res: Response) => Response<any, Record<string, any>>;
};
export default response;
//# sourceMappingURL=response.d.ts.map