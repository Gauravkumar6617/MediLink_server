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
    default:'hospital'
},


hospitalCode: {
    type: String,
    required: true,
    unique: true,
    default: () => `HOSP-${Math.floor(1000 + Math.random() * 9000)}`, 
  },
  location:{
    type:{
    type:String,
    enum:['Point'],
    default:'point',
    },
    coordinates:{
        type:[Number],
        required:true
    }
  },
},{timestamps:true});
HospitalScehma.index({ location: "2dsphere" });

export default mongoose.model("Hospital", HospitalScehma);