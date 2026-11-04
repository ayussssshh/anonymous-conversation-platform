import { Router } from "express";
import { getRoomList } from "../controllers/rooms_Controller.js";

const router = Router();


router.get("/room-list", getRoomList);

export default router
