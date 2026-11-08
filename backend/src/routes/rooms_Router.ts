import { Router } from "express";
import {
    CTRL_getRoomList,
    CTRL_createRoom
} from "../controllers/rooms_Controller.js";

const router = Router();


router.get("/room-list", CTRL_getRoomList);
router.post("/room-create", CTRL_createRoom)

export default router
