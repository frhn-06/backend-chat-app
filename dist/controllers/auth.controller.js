"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../utils/response"));
const user_model_1 = __importStar(require("../models/user.model"));
const encrypt_1 = __importDefault(require("../utils/encrypt"));
const jwt_1 = require("../utils/jwt");
const mongoose_1 = require("mongoose");
const upload_1 = __importDefault(require("../utils/upload"));
const authController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, fullName, email, password, confirmPassword } = yield user_model_1.userDTO.validate(req.body);
                const result = yield user_model_1.default.create({ userName, fullName, email, password });
                response_1.default.success(res, result, "success to register");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to register");
            }
        });
    },
    activation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = req.body;
                const result = yield user_model_1.default.findOneAndUpdate({
                    activationCode: code
                }, {
                    isActive: true
                }, {
                    new: true
                });
                if (!result) {
                    return response_1.default.notFound(res, "user not found");
                }
                response_1.default.success(res, result, "success to activation");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to activation");
            }
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { identifier, password } = req.body;
                yield user_model_1.loginDTO.validate({ identifier, password });
                const data = yield user_model_1.default.findOne({
                    $or: [
                        {
                            email: identifier
                        },
                        {
                            userName: identifier
                        }
                    ],
                    isActive: true
                });
                if (!data) {
                    return response_1.default.error(res, null, "user not found");
                }
                const passwordMatch = data.password === (0, encrypt_1.default)(password);
                if (!passwordMatch) {
                    return response_1.default.error(res, null, "your password is wrong");
                }
                const token = (0, jwt_1.signIn)({
                    id: data._id
                });
                response_1.default.success(res, token, "user success to login");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to login");
            }
        });
    },
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                if (!user)
                    return response_1.default.unauthorize(res);
                response_1.default.success(res, user, "success to get me");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to get me");
            }
        });
    },
    findUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                if (!(0, mongoose_1.isValidObjectId)(userId)) {
                    return response_1.default.notFound(res, "user not found");
                }
                const result = yield user_model_1.default.findById(userId);
                if (!result) {
                    return response_1.default.notFound(res, "user not found");
                }
                response_1.default.success(res, result, "success to get user by id");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to get user by id");
            }
        });
    },
    searchByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!(0, mongoose_1.isValidObjectId)(userId))
                    return response_1.default.unauthorize(res);
                const { name } = req.params;
                const filter = {
                    _id: { $ne: userId },
                    userName: { $regex: name, $options: "i" },
                    isActive: true
                };
                const user = yield user_model_1.default.find(filter).limit(3).exec();
                if (!user)
                    return response_1.default.error(res, null, "user is not found");
                response_1.default.success(res, user, "success to search user");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to search user");
            }
        });
    },
    addAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!(0, mongoose_1.isValidObjectId)(userId))
                    return response_1.default.unauthorize(res);
                const file = req.file;
                if (!file) {
                    return response_1.default.error(res, new Error("file tidak ditemukan"), "file tidak ditemukan");
                }
                let user = yield user_model_1.default.findById(userId);
                const resultUpload = yield upload_1.default.uploadSingle(file);
                if ((user === null || user === void 0 ? void 0 : user.avatar) && user.avatar !== resultUpload.secure_url) {
                    yield upload_1.default.remove(user === null || user === void 0 ? void 0 : user.avatar);
                }
                const result = yield user_model_1.default.findByIdAndUpdate(userId, {
                    avatar: resultUpload.secure_url
                }, {
                    new: true
                });
                response_1.default.success(res, result, "success to addAvatar");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to add avatar");
            }
        });
    },
    removeAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!(0, mongoose_1.isValidObjectId)(userId))
                    return response_1.default.unauthorize(res);
                const user = yield user_model_1.default.findById(userId);
                const oldAvatar = user === null || user === void 0 ? void 0 : user.avatar;
                if (!oldAvatar) {
                    return response_1.default.error(res, new Error("file tidak sesuai"), "file yg dikirim tidak sesuai");
                }
                yield upload_1.default.remove(oldAvatar);
                const result = yield user_model_1.default.findByIdAndUpdate(userId, {
                    $unset: {
                        avatar: ""
                    }
                }, {
                    new: true
                });
                response_1.default.success(res, result, "success to remove avatar");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to remove avatar");
            }
        });
    },
    updateInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return response_1.default.unauthorize(res);
                }
                const { userName, fullName } = req.body;
                const validate = yield user_model_1.userUpdateInfo.validate({ userName, fullName });
                const result = yield user_model_1.default.findByIdAndUpdate(userId, validate, { new: true });
                response_1.default.success(res, result, "success to update info");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to update info");
            }
        });
    }
    // async updateAvatar(req: IReqUser, res: Response) {
    //     try {
    //         const userId = req.user?.id;
    //         if(!isValidObjectId(userId)) return response.unauthorize(res);
    //         const user = await UserModel.findById(userId);
    //         if(!user) return response.notFound(res, "user not found");
    //         const oldAvatar = user?.avatar;
    //         const {avatar} = req.body as {avatar: string};
    //         const result = await UserModel.findByIdAndUpdate(userId, {
    //             avatar: avatar
    //         }, {
    //             new: true
    //         })
    //         if(oldAvatar && oldAvatar !== avatar) {
    //             await upload.remove(oldAvatar);
    //         }
    //         response.success(res, result, "success to update avatar");
    //     } catch(error) {
    //         response.error(res, error, "failed to update avatar")
    //     }
    // },
    // async removeAvatar(req: IReqUser, res: Response) {
    //     try {
    //         const userId = req.user?.id;
    //         if(!isValidObjectId(userId)) return response.unauthorize(res);
    //         const user = await UserModel.findById(userId);
    //         if(!user) return response.notFound(res, "user not found");
    //         const oldAvatar = user.avatar;
    //         const result = await UserModel.findByIdAndUpdate(userId, {
    //             avatar: ""
    //         }, {
    //             new: true
    //         })
    //         await upload.remove(oldAvatar);
    //         response.success(res, result, "success to remove avatar")
    //     }catch(error) {
    //         response.error(res, error, "failed to update avatar")
    //     }
    // }
};
exports.default = authController;
//# sourceMappingURL=auth.controller.js.map