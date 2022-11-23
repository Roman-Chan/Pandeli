import { Router } from "express"
import {getBreadFlavor,getBreadFlavorByid,PostBreadFlavor,DeleteBreadFlavor,PatchBreadFlavor} from "../Controllers/breadflavor.contoller.js"
import { uploadmulter } from "../Controllers/img.controller.js";
import {admin,auth,fullAccess} from "../middleware/auth.js"

const router = Router();

router.get("/breadflavor",getBreadFlavor)
router.get("/breadflavor/:id",getBreadFlavorByid)
router.post("/breadflavor",PostBreadFlavor)
router.delete("/breadflavor/:id",DeleteBreadFlavor)
router.patch("/breadflavor/:id",PatchBreadFlavor)

export default router