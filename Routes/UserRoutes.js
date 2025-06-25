import express from "express"
import {registerUser,UserLogin} from "../Controller/userController.js";
const router=express.Router();
router.post("/auth/registeruser",registerUser);
router.post("/auth/loginUser",UserLogin);
export default router;