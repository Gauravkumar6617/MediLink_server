import app from "./app.js";
import express from "express";
import ConnectDb from "./config/connection.js";

const PORT = process.env.PORT || 8081

ConnectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
})
