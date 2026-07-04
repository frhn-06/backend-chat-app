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
// import router from './routes/api';
// import db from './utils/db';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import docs from './docs/route';
// import { Server, Socket } from 'socket.io';
// import http from 'http'
exports.users = {};
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await db();
        // console.log("database status is : " + result)
        const app = (0, express_1.default)();
        const port = process.env.PORT || 3000;
        // const server = http.createServer(app);
        // io = new Server(server, {
        //     cors: {
        //         origin: '*'
        //     }
        // });
        // io.on("connection", (socket: Socket) => {
        //     socket.on("register", (userId) => {
        //         users[userId] = socket.id;
        //         console.log("berhasil register");
        //     });
        //     socket.on("disconnect", () => {
        //         for(const userId in users) {
        //             if(users[userId] === socket.id) {
        //                 delete users[userId];
        //             }
        //         }
        //         console.log("berhasil disconet");
        //     })
        // })
        // app.use(cors());
        // app.use(bodyParser.json());
        app.get("/", (req, res) => {
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "ok"
                },
                data: "backend chat app"
            });
        });
        // app.use("/api", router);
        // docs(app);        
        app.listen(port, () => {
            console.log("server is listening on port : " + port);
        });
    }
    catch (error) {
        console.log(error);
    }
});
init();
//# sourceMappingURL=index.js.map