import express, { Request, Response } from 'express';
import router from './routes/api';
import db from './utils/db';
import bodyParser from 'body-parser';
import cors from 'cors';
import docs from './docs/route';



const init = async () => {
    try {
        const result = await db();
        console.log("database status: " + result)

        const app = express();
        const port = 3000;
    
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

        
        
        app.listen(port, () => {
            console.log("server is listening on port : " + port)
        })
    } catch (error) {
        console.log(error);
    }
}

init();