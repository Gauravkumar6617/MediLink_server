import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: Number,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },

  dateOfBirth: {
    type: Date,
  },

  role: {
    type: String,
    enum: ['user'],
    default: 'user',
  },


}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
