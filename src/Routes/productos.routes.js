import { Router } from "express";
import { getProducts, getProductsByid ,PostProducts, DeleteProduct, PutProducts,prueba, prueba2} from "../Controllers/productos.controllers.js";
import { uploadmulter } from "../Controllers/img.controller.js";
import {admin,auth,fullAccess} from "../middleware/auth.js"
const router = Router();

router.get("/products/:page",auth,fullAccess,getProducts);
router.get("/product/:id",getProductsByid)
router.get("/prueba",prueba)
router.post("/prueba",uploadmulter,PostProducts);
router.delete("/product/:id",auth,admin,DeleteProduct);
router.get("/prueba2/:id",prueba2)
router.patch("/prueba2/:id",uploadmulter,PutProducts);


export default router;