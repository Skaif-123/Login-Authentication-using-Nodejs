import { Router } from "express";
import { ensureValidation } from "../middleware/auth_middleware.js";
const router=Router();

router.get('/',ensureValidation,(req,res)=>{
    res.status(200).json([{
        "name":"mobile",
        "price":"50000"
    },{
        "name":"laptop",
        "price":"150000"
    }])
})

export default router;
