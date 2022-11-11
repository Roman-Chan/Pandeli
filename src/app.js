import  express  from "express";
import productosRoutes from "./Routes/productos.routes.js"
import rellenosRoutes from "./Routes/relleno.routes.js"
import login from "./Routes/login.routes.js"
const app = express();

app.use(express.text())
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(login)
app.use(rellenosRoutes);
app.use(productosRoutes);
app.use((req,res,next) => {
    res.status(404).json({message:"Ruta no encontrada"});
})

export default app