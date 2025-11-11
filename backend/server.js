dotenv.config({path:"E:/MERN PROJECTS/JWT Authentication/backend/.env"})
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { ConnectToDB } from "./database/db.js";
import auth_routes from "./routes/auth_routes.js";
import products_routes from "./routes/products_routes.js";


const app=express();
app.use(express.json());
ConnectToDB();
// Enable CORS for all routes
app.use(cors());
app.use("/api/auth",auth_routes)
app.use("/api/auth",products_routes)


const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`); 
})
