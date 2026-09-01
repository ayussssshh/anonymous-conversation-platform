import express from "express";
import mainRouter from "./routes/HomePageRoutes.js";
import logger from "./lib/logger.js";
import { pinoHttp } from "pino-http";


export function buildApp() {
    const app = express();

    app.use(express.json());
    app.use(
        pinoHttp({
            logger
        })
    )
    app.use("/", mainRouter)

    return app;
}
