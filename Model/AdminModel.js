// models/User.js
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin'], default: 'admin' },
})

// Pre-save hash
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// Compare method
AdminSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('Admin', AdminSchema)
