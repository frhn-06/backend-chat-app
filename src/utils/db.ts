import mongoose from "mongoose"
import { DATABASE_URL } from "./env";

const db = async () => {
    try {
        await mongoose.connect(DATABASE_URL, {
            dbName: "chat_app"
        });

        console.log(`Active db name : ${mongoose.connection.name}`);

        return Promise.resolve("database connected !");
    } catch(error) {
        return Promise.reject(error);
    }
} 

export default db;