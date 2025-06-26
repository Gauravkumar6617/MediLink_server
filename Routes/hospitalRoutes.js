import express from "express";
import {hospitalRegister,hospitalLogin,getAssociatedDoctors} from "../Controller/hospitalController.js";
import { hospitalAuth } from "../middleware/hospitalAuth.js";
const router= express.Router();
router.post("/hospital/register", hospitalRegister);
router.post("/hospital/login",hospitalLogin);
router.get("/hospital/getalldoctor",hospitalAuth, getAssociatedDoctors)
export default router;