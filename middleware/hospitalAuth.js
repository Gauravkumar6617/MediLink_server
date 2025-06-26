// middleware/hospitalAuth.js
import jwt from "jsonwebtoken";
import HospitalModel from "../Model/HospitalModel.js";

export const hospitalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hospital = await HospitalModel.findById(decoded.hospital);
    if (!hospital) {
      return res.status(401).json({ message: "Hospital not found" });
    }

    req.hospital = hospital; // ✅ set in request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error: error.message });
  }
};
