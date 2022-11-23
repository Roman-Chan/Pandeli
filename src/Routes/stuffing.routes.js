import { Router } from "express"
import {getStuffing,getStuffingByid,PostStuffing,DeleteStuffing,PatchStuffing} from "../Controllers/stuffing.controller.js"
import { uploadmulter } from "../Controllers/img.controller.js";
import {admin,auth,fullAccess} from "../middleware/auth.js"

const router = Router();

router.get("/stuffing",getStuffing)
router.get("/stuffing/:id",getStuffingByid)
router.post("/stuffing",PostStuffing)
router.delete("/stuffing/:id",DeleteStuffing)
router.patch("/stuffing/:id",PatchStuffing)

export default router