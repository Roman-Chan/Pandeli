import { postRelllenos,getRellenos,getRellenosbyid ,deleteRellenos, updateRellenos} from "../Controllers/relleno.controllers.js";
import {Router} from "express";

const router = Router();
router.post("/relleno",postRelllenos);
router.get("/rellenos",getRellenos);
router.get("/relleno/:id",getRellenosbyid);
router.delete("/relleno/:id",deleteRellenos);
router.patch("/relleno/:id",updateRellenos);

export default router;