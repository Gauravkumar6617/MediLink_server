import express from "express";
import DoctorModel from "../Model/DoctorModel.js";
import bcrypt from "bcrypt"

function generateDoctorCode(hospitalId) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `DOC-${hospitalId.toString().slice(-4)}-${randomNum}`;
  }

  export const doctorRegister=async(req,res)=>{
    try {
        const { name, email, specialization, phone, experience, password } = req.body;
        const hospitalId=req.hospital._id;
        const existdoctor= await DoctorModel.findOne({email});
        if(existdoctor){return res.status(400).json({message:"doctor already exits"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const doctorCode = generateDoctorCode(hospitalId);
        const doctor = await DoctorModel.create({
            name,
            email,
            phone,
            specialization,
            experience,
            password: hashedPassword,
            hospital: hospitalId,
            doctorCode,
            isActive: true,
          });
      
          res.status(201).json({
            message: "Doctor added successfully",
            doctor: {
              id: doctor._id,
              name: doctor.name,
              email: doctor.email,
              doctorCode: doctor.doctorCode
            }
          });
        } catch (err) {
          res.status(500).json({ message: "Failed to add doctor", error: err.message });
        }
      };
  