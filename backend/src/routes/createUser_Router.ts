import { Router } from "express";
import { createUser,} from "../controllers/createUser_Controller.js";


const router = Router();

router.get("/", createUser);


export default router;