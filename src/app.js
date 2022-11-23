import  express  from "express";
import productosRoutes from "./Routes/productos.routes.js"
import login from "./Routes/login.routes.js"
import snackflavor from "./Routes/snackflavor.routes.js"
import breadflavor from "./Routes/breadflavor.routes.js"
import stuffing from "./Routes/stuffing.routes.js"
import size from "./Routes/size.routes.js"
import pieces from  "./Routes/pieces.routes.js"   
import car from "./Routes/shoppingcart.routes.js"


const app = express();

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename,"../../public/img");

app.use(express.text())
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(login)
app.use(car)
app.use("/img", express.static(__dirname))
app.use(snackflavor);
app.use(breadflavor);
app.use(size);
app.use(pieces);
app.use(stuffing);
app.use(productosRoutes);
app.use((req,res,next) => {
    res.status(404).json({message:"Ruta no encontrada"});
})

export default app