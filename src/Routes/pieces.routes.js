import { Router } from "express"
import {getPieces,getPiecesByid,PostPieces,deletePieces,PatchPieces} from "../Controllers/pieces.controller.js"
import { uploadmulter } from "../Controllers/img.controller.js";
import {admin,auth,fullAccess} from "../middleware/auth.js"

const router = Router();

router.get("/pieces",getPieces)
router.get("/pieces/:id",getPiecesByid)
router.post("/pieces",PostPieces)
router.delete("/pieces/:id",deletePieces)
router.patch("/pieces/:id",PatchPieces)

export default router