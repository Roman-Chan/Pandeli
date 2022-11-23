import { Router } from "express"
import {getSnackFlavor,getSnackFlavorByid,PostSnackFlavor,DeleteSnackFlavor,PatchSnackFlavor} from "../Controllers/snackflavor.contoller.js"
import { uploadmulter } from "../Controllers/img.controller.js";
import {admin,auth,fullAccess} from "../middleware/auth.js"

const router = Router();

router.get("/snackflavor",getSnackFlavor)
router.get("/snackflavor/:id",getSnackFlavorByid)
router.post("/snackflavor",PostSnackFlavor)
router.delete("/snackflavor/:id",DeleteSnackFlavor)
router.patch("/snackflavor/:id",PatchSnackFlavor)

export default router