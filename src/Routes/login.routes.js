import { Router } from "express";
import {register,login,loginAdmin} from "../Controllers/Login.contollers.js"
const router = Router();

router.post("/register",register)

//login de movil 
router.post("/login",login)

//login de web
router.post("/login/admin",loginAdmin)

export default router;