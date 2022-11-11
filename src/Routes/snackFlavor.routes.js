import { post,get,getbyid ,deleteS, update} from "../Controllers/snackFlavor.js";
import {Router} from "express";

const router = Router();
router.post("/bocadillo",post);
router.get("/bocadillo/:page",get);
router.get("/bocadillo/:id",getbyid);
router.delete("/bocadillo/:id",deleteS);
router.patch("/bocadillo/:id",update);

export default router;