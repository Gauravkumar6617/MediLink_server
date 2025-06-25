import express from 'express';
import dotenv from 'dotenv';
import UserRoutes from "./Routes/UserRoutes.js"


dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api",UserRoutes);


export default app;
