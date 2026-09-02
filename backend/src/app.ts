import express from "express";
import mainRouter from "./routes/HomePageRoutes.js";
import logger from "./lib/logger.js";
import { pinoHttp } from "pino-http";
import cors from "cors"
import cookieParser from "cookie-parser";


export function buildApp() {
    const app = express();


    app.use(cookieParser())

    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
    app.use(express.json());
    app.use(
        pinoHttp({
            logger
        })
    )
    app.use("/", mainRouter)

    return app;
}
