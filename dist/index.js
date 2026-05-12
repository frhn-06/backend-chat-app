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
exports.io = exports.users = void 0;
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const db_1 = __importDefault(require("./utils/db"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./docs/route"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
exports.users = {};
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.default)();
        console.log("database status is : " + result);
        const app = (0, express_1.default)();
        const port = process.env.PORT || 3000;
        const server = http_1.default.createServer(app);
        exports.io = new socket_io_1.Server(server, {
            cors: {
                origin: '*'
            }
        });
        exports.io.on("connection", (socket) => {
            socket.on("register", (userId) => {
                exports.users[userId] = socket.id;
                console.log("berhasil register");
            });
            // socket.on("mengetik", (targetId) => {
            //     const socketId = users[targetId]
            //     if(socketId) {
            //         io.to(socketId).emit("mengetik", {
            //             target: targetId
            //         })
            //     }
            // })
            // socket.on("stopMengetik", (targetId) => {
            //     const socketId = users[targetId];
            //     if(socketId) {
            //         io.to(socketId).emit("stopMengetik", {
            //             target: targetId
            //         })
            //     }
            // })
            socket.on("disconnect", () => {
                for (const userId in exports.users) {
                    if (exports.users[userId] === socket.id) {
                        delete exports.users[userId];
                    }
                }
                console.log("berhasil disconet");
            });
        });
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.json());
        app.get("/", (req, res) => {
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "ok"
                },
                data: "backend chat app"
            });
        });
        app.use("/api", api_1.default);
        (0, route_1.default)(app);
        server.listen(port, () => {
            console.log("server is listening on port : " + port);
        });
    }
    catch (error) {
        console.log(error);
    }
});
init();
//# sourceMappingURL=index.js.map