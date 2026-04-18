import express, { Request, Response } from 'express';
import router from './routes/api';
import db from './utils/db';
import bodyParser from 'body-parser';
import cors from 'cors';
import docs from './docs/route';

import { Server, Socket } from 'socket.io';
import http from 'http'

export const users: Record<string, unknown> = {};
export let io: any;


const init = async () => {
    try {
        const result = await db();
        console.log("database status: " + result)

        const app = express();
        const port = 3000;


        const server = http.createServer(app);

        io = new Server(server, {
            cors: {
                origin: '*'
            }
        });


        io.on("connection", (socket: Socket) => {
            socket.on("register", (userId) => {
                users[userId] = socket.id;
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
                for(const userId in users) {
                    if(users[userId] === socket.id) {
                        delete users[userId];
                    }
                }
                console.log("berhasil disconet");
            })
        })

    
        app.use(cors());

        app.use(bodyParser.json());


        app.get("/", (req: Request, res: Response) => {
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "ok"
                },
                data: "backend chat app"
            })
        })
        
        app.use("/api", router);
        
        docs(app);        

        
        
        server.listen(port, () => {
            console.log("server is listening on port : " + port)
        })
    } catch (error) {
        console.log(error);
    }
}

init();