import express from "express";
import { loginUser, registerUser } from "../controllers/auth_controllers.js";
import { loginValidation, signUpValidation } from "../middleware/auth_validation.js";

const router = express.Router();
router.post("/register",signUpValidation, registerUser);
router.post("/login",loginValidation, loginUser);

export default router ;
