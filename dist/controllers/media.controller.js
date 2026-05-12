"use strict";
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
const upload_1 = __importDefault(require("../utils/upload"));
const mediaController = {
    single: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const file = req.file;
            if (!file) {
                return response_1.default.error(res, null, "file tidak ditemukan");
            }
            const result = yield upload_1.default.uploadSingle(file);
            response_1.default.success(res, result, "success");
        }
        catch (error) {
            response_1.default.error(res, null, "failed to upload a photo");
        }
    }),
    remove: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { fileUrl } = req.body;
            const result = yield upload_1.default.remove(fileUrl);
            response_1.default.success(res, result, "success to remove a photo");
        }
        catch (error) {
            response_1.default.error(res, null, "failed to remove a photo");
        }
    })
};
exports.default = mediaController;
//# sourceMappingURL=media.controller.js.map