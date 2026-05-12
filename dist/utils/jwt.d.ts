import { IUserToken } from '../types/user';
declare const signIn: (user: IUserToken) => string;
declare const getUserByToken: (token: string) => IUserToken;
export { signIn, getUserByToken };
//# sourceMappingURL=jwt.d.ts.map