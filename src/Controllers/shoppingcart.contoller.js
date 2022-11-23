import { pool } from "../db.js";

export const getCar = async (req,res)=>{

        const [rows] = await pool.query("SELECT * FROM carrito_compra")
        const [result] = await pool.query("SELECT * FROM producto")
        res.json({rows,result}) 
}

export const postCarCakes = async (req,res) =>
{
        const {idProducto,idSabor,idRelleno,idTamaño,subtotal} = req.body
        const [rows] = await pool.query("INSERT INTO carrito_compra (Id_Producto,Id_saborpan,Id_relleno,Id_tamaño,Subtotal) VALUES (?,?,?,?,?)",[idProducto,idSabor,idRelleno,idTamaño,subtotal]);
        res.status(201).json({
                id: rows.insertId,
                idProducto,
                idSabor,
                idRelleno,
                idTamaño,
                subtotal
        })
}

export const postCarSnack = async (req,res) =>
{
        const {idProducto,idSabor,idRelleno,idTamaño,subtotal} = req.body
        const [rows] = await pool.query("INSERT INTO carrito_compra (Id_Producto,Id_saborpan,Id_relleno,Id_tamaño,Subtotal) VALUES (?,?,?,?,?)",[idProducto,idSabor,idRelleno,idTamaño,subtotal]);
        res.status(201).json({
                id: rows.insertId,
                idProducto,
                idSabor,
                idRelleno,
                idTamaño,
                subtotal
        })
}