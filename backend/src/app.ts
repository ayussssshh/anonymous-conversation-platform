import express from "express";
import logger from "./lib/logger.js";
import { pinoHttp } from "pino-http";
import cors from "cors"
import cookieParser from "cookie-parser";


import createUser_Router from "./routes/createUser_Router.js";
import rooms_Router from "./routes/rooms_Router.js"



export function buildApp() {
    const app = express();


    app.use(cookieParser())

    app.use(
        cors({
            origin: "http://localhost:5173",
            credentials: true
        })
    );
    app.use(express.json());
    // app.use(
    //     pinoHttp({
    //         logger
    //     })
    // )
    app.use("/api/create-temp-session", createUser_Router)
    app.use("/api/rooms", rooms_Router)

    return app;
}
