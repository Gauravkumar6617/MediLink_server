import express from 'express';
import dotenv from 'dotenv';
import UserRoutes from "./Routes/UserRoutes.js"
import HospitalRoutes from "./Routes/hospitalRoutes.js"
import DoctorRoutes from "./Routes/doctorRoutes.js"
import adminRoutes from "./Routes/adminRoutes.js"
import Admin from './Model/AdminModel.js'
import bcrypt from 'bcrypt'


dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api",UserRoutes);
app.use("/api",HospitalRoutes);
app.use("/api",DoctorRoutes);
app.use(adminRoutes)
app.get('/create-admin', async (req, res) => {
    const existing = await Admin.findOne({ email: 'admin@example.com' })
    if (existing) return res.send('Admin already exists')
  
    const password = await bcrypt.hash('admin123', 10)
    await Admin.create({
      name: 'Super Admin',
      email: 'admin@example.com',
      password,
      role: 'admin'
    })
    res.send('✅ Admin user created')
  });
  app.get('/reset-admin', async (req, res) => {
    const hashedPassword = await bcrypt.hash('admin123', 10)
  
    const admin = await Admin.findOneAndUpdate(
      { email: 'admin@example.com' },
      {
        name: 'Super Admin',
        password: hashedPassword,
        role: 'admin',
      },
      { upsert: true, new: true }
    )
  
    res.send('✅ Admin reset with email: admin@example.com and password: admin123')
  })

export default app;
