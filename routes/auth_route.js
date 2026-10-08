import express from "express";
import { registor,login, getMe } from "../controllers/auth_controller.js";
import protect from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/registor",registor);
router.post("/login",login );
router.get("/profile",protect,getMe);

export default router;