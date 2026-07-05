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
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const db_1 = __importDefault(require("./utils/db"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import docs from './docs/route';
// import { Server, Socket } from 'socket.io';
// import http from 'http'
// export const users: Record<string, unknown> = {};
// export let io: any;
// const init = async () => {
//     try {
// const result = await db();
// console.log("database status is : " + result)
// const app = express();
// const port = process.env.PORT || 3000;
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
// app.get("/", (req: Request, res: Response) => {
//     res.status(200).json({
//         meta: {
//             status: 200,
//             message: "ok"
//         },
//         data: "backend chat app"
//     })
// })
// app.use("/api", router);
// docs(app);        
//         app.listen(port, () => {
//             console.log("server is listening on port : " + port)
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// init();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (_, res) => {
    res.json({
        message: "hello"
    });
});
app.use("/api", api_1.default);
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.default)();
            console.log("database connected");
        }
        catch (err) {
            console.error(err);
        }
    });
}
init();
//# sourceMappingURL=index.js.map