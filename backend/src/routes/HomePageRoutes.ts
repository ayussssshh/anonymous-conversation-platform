import { Router } from "express";
import logger from "../lib/logger.js";
import { createUser } from "../controllers/createUser.js";


const router = Router();

router.get("/api", createUser);

export default router;