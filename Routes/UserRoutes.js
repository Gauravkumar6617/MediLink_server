import express from "express"
import {registerUser,UserLogin,getUserProfile} from "../Controller/userController.js";
import { userAuth } from "../middleware/userAuth.js";
const router=express.Router();
router.post("/auth/registeruser",registerUser);
router.post("/auth/loginUser",UserLogin);
router.get("/auth/profile",userAuth,getUserProfile);
export default router;