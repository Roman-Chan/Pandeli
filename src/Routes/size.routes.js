import { Router } from "express"
import {getSize,getSizeByid,PostSize,DeleteSize,PatchSize} from "../Controllers/Size.controller.js"
import { uploadmulter } from "../Controllers/img.controller.js";
import {admin,auth,fullAccess} from "../middleware/auth.js"

const router = Router();

router.get("/size",getSize)
router.get("/size/:id",getSizeByid)
router.post("/size",PostSize)
router.delete("/size/:id",DeleteSize)
router.patch("/size/:id",PatchSize)

export default router