import { Router } from "express";
import logger from "../lib/logger.js";


const router = Router();

router.get("/", (req, res) => {

    res.json({
        name: "anoyt",
        status: "ok",
    });
});

export default router;