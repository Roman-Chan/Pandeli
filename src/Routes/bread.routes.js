import { post,get,getbyid ,deletep, update} from "../Controllers/breadFlavor.controller";
import {Router} from "express";

const router = Router();
router.post("/pan",post);
router.get("/pan/:page",get);
router.get("/pan/:id",get);
router.delete("/pan/:id",deletep);
router.patch("/pan/:id",update);

export default router;