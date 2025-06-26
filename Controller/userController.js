import express from "express";
import UserModel from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()

export const registerUser=async(req, res)=>{
try {
    const {name,email,phone,password,gender,dateOfBirth}=req.body;

    const existingUser = await UserModel.findOne({email});
    if(existingUser){
       return res.status(400).json({message:"User Already Exist",success:false,});
    }
    const hashedPassword= await bcrypt.hash(password,10);

    const user = await UserModel.create({
        name,email,phone,password:hashedPassword,gender,dateOfBirth
    });
  return  res.status(200).json({message:"User Created Successfully Successfully"})
} catch (error) {
    return res.status(500).json({ message: 'Registration error', error: error.message });
}

}

export const UserLogin=async(req , res)=>{
try {
    const {email,password}=req.body;

    const user= await UserModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"No User Found",success:false});
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        return res.status(400).json({message:"Invalid password", success:false});

    }
    const token = jwt.sign({
     id:user._id , role:user.role
    },process.env.JWT_SECRET,      { expiresIn: '7d' }
)
return res.status(200).json({
    token,
    user:user._id,
    name:user.name,
    role:user.role,
    email:user.email,message:"User Login Successfully"

})


} catch (error) {
    return res.status(500).json({ message: 'login error', error: error.message });
}
}
export const getUserProfile = async (req, res) => {
    try {
      const user = await UserModel.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching profile', error: err.message });
    }
  }; 