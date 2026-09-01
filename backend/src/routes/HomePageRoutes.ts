import { Router } from "express";
import logger from "../lib/logger";


const router = Router();

router.get("/", (req, res) => {

    logger.info("endpoit hit")

    res.json({
        name: "anoyt",
        status: "ok",
    });
});

export default router;