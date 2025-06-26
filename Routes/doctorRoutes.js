// routes/doctorRoutes.js
import express from "express";
import { doctorRegister } from "../Controller/doctorController.js";
import { hospitalAuth } from "../middleware/hospitalAuth.js";

const router = express.Router();

router.post("/adddoctor", hospitalAuth, doctorRegister);

export default router;
