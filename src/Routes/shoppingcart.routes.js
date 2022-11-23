import { Router } from "express"
import {getCar} from "../Controllers/shoppingcart.contoller.js"
import { uploadmulter } from "../Controllers/img.controller.js";
import {admin,auth,fullAccess} from "../middleware/auth.js"

const router = Router();

router.get("/carrito",getCar)

export default router