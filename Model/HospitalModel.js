import mongoose from "mongoose";
const HospitalScehma = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    number:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
    }
,
password:{
    type:String,
    required:true,
},
role:{
    type:String,
    enum:['hospital'],
    required:true
},
hospitalCode: {
    type: String,
    required: true,
    unique: true,
    default: () => `HOSP-${Math.floor(1000 + Math.random() * 9000)}`, 
  },
},{timestamps:true});

export default mongoose.model("Hospital", HospitalScehma);