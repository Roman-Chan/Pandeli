import { Router } from "express";
import { getProducts, getProductsByid ,PostProducts, DeleteProduct, PatchProducts,prueba, putImg, getCake, getSnack} from "../Controllers/productos.controllers.js";
import { uploadmulter } from "../Controllers/img.controller.js";
import {admin,auth,fullAccess} from "../middleware/auth.js"
const router = Router();

router.get("/products/:page",auth,fullAccess,getProducts);
router.get("/product/:id",auth,fullAccess,getProductsByid)

//Ver los bocadillos
router.get("/productoss/snack",auth,fullAccess,getSnack)
//ver los pasteles
router.get("/productsc/cake",auth,fullAccess,getCake)

router.get("/prueba",prueba)
router.post("/prueba",uploadmulter,PostProducts);
router.delete("/product/:id",auth,admin,DeleteProduct);
router.patch("/product/:id",auth,admin,uploadmulter,PatchProducts);

// actualizar imagen del producto
router.put("/product/:id",auth,admin,uploadmulter,putImg)


export default router;