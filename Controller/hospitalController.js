import express from "express";
import HospitalModel from "../Model/HospitalModel.js";
import DoctorModel from "../Model/DoctorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()
export const hospitalRegister=async(req, res)=>{
    try {
        const {name,email,description,number,password,location}=req.body;
        const existingHospital= await HospitalModel.findOne({email});
        if(existingHospital){
            return res.status(400).json({message:"Hospital Already exist",success:false});

        }
        if(!location || !location.coordinates || location.coordinates.length!==2){
            return res.status(400).json({
                message:"required location also"
            })
        }
        const hashedPassword= await bcrypt.hash(password, 10); 
        const hospital = await HospitalModel.create({
            name,email,description,number,password:hashedPassword,location
        });

        return res.status(200).json({
            success:true,
            message:"hospital has been created",

        });
    } catch (error) {
        return res.status(500).json({message:"error while creating hospital",error:error.message})
    }
}
export const hospitalLogin=async(req, res)=>{
    try {
        const {email,password}=req.body;
        const hospital= await HospitalModel.findOne({email});
        if(!hospital){
return res.status(400).json({message:"no hospital found",success:false});
        }
        const match = await bcrypt.compare(password, hospital.password);
        if(!match){
            return res.status(400).json({message:"invalid credntials",success:false});
        }
        const token= jwt.sign(
            {hospital:hospital._id}
        ,process.env.JWT_SECRET,{expiresIn:'7d'});
        return res.status(200).json({
            token,hospital:hospital._id,
            hospital:hospital.name,
            hospital:hospital.description,
            hospital:hospital.email
        })
    } catch (error) {
        return res.status(500).json({message:"error while login hospital",error:error.message})
    }

}
export const getAssociatedDoctors = async (req, res) => {
    try {
      const hospitalId = req.hospital._id;
      
  
      const doctors = await DoctorModel.find({ hospital: hospitalId }).select(
        "-password"
      ); // exclude password for security
  
      res.status(200).json({
        success: true,
        count: doctors.length,
        doctors,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch associated doctors",
        error: error.message,
      });
    }
  };

