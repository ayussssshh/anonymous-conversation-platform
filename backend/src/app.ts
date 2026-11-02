import express from "express";
import frontend_router from "./routes/HomePageRoutes.js";
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
            credentials: true
        })
    );
    app.use(express.json());
    app.use(
        pinoHttp({
            logger
        })
    )
    app.use("/api/", frontend_router)

    return app;
}
