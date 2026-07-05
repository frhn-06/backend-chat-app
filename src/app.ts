import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import router from './routes/api';




const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (_, res) => {
    res.json({
        message: "hello",
    });
});

app.use("/api", router);

export default app;