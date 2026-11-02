import { Router } from "express";
import logger from "../lib/logger.js";
import { createUser, getRoomList } from "../controllers/createUser.js";


const router = Router();

router.get("/create-temp-session", createUser);
router.get("/room-list", getRoomList);

export default router;