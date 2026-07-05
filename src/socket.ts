import http from 'http'
import { Server, Socket } from 'socket.io'

export const users: Record<string, string> = {};

export let io : Server


export const initSocket = (server: http.Server) => {
    io = new Server(server, {
        cors: {
            origin: '*'
        }
    })


    io.on("connection", (socket: Socket) => {
        socket.on("register", (userId) => {
            users[userId] = socket.id;
            console.log("berhasil register");
        });


        socket.on("disconnect", () => {
            for(const userId in users) {
                if(users[userId] === socket.id) {
                    delete users[userId];
                }
            }
            console.log("berhasil disconet");
        })
    })

    return io;
}



export const getId = () => {
    if(!io) {
        throw new Error("Socket io belum diinisialisasi")
    }

    return io;
}