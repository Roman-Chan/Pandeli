import { pool } from "../db.js";
import { fileURLToPath } from "url";
import path from "path";
import fs  from "fs";


const __filename = fileURLToPath(import.meta.url);

export const prueba  = (req,res)=>
{
    res.render(path.join(__filename,"../../views/prueba.hbs"))
}


export const getProducts = async (req,res)=>{
    try
    {
        const {page} = req.params;
        const numberForPage = 5;
        const skip = (page-1) * numberForPage;
        const limit = skip + " , " + numberForPage;
        
        const [rows] = await pool.query("SELECT * FROM producto")
        const numRows = rows.length;
        const numPages = Math.ceil(numRows / numberForPage);
        console.log(numPages)
        if(page > numPages || page <= 0) return res.status(404).json("No existe la pagina")
           const [result] = await pool.query("SELECT * FROM producto Limit " +limit )
            res.status(200).json(result)  
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}

export const getSnack =async (req, res) =>
{
    try
    {
        const [rows] = await pool.query("SELECT * FROM producto WHERE Id_Categoria = 2")
        res.status(200).json(rows)

    }catch
    {
        return res.status(500).json("Ocurrio un error")
    }
}


export const getCake =async (req, res) =>
{
    try
    {
        const [rows] = await pool.query("SELECT * FROM producto WHERE Id_Categoria = 1")
        res.status(200).json(rows)

    }catch
    {
        return res.status(500).json("Ocurrio un error")
    }
}

export const getProductsByid = async (req,res) =>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM producto WHERE Id = ?",[req.params.id]);
        if(rows.length <= 0)res.status(404).json("No se encontro el producto")
            res.status(200).json(rows[0])
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}

export const PostProducts = async (req,res)=>{
    
        const img = req.file.filename
        const {idcategoria,nombre,descripcion,total}  = req.body
        if(!idcategoria || !nombre ||  !descripcion || !total)  return res.status(400).send("Campo vacio") 
            const [rows] = await pool.query("INSERT INTO producto (img,Id_Categoria,Nombre,Descripcion,Total) VALUES (?,?,?,?,?)",[img,idcategoria,nombre,descripcion,total])
                res.status(201).json({
                    id: rows.insertId,
                    img,
                    idcategoria,
                    nombre,
                    descripcion,
                    total
                })
}

export const DeleteProduct = async (req,res)=>{

        const {id} = req.params
        const [result] = await pool.query("SELECT * FROM producto WHERE Id = ?",[id])
        const [rows] = await pool.query("DELETE FROM producto WHERE Id = ? ",[id])
        if(rows.affectedRows <= 0)return res.status(404).json("Producto no encontrado")
        const deleteimg = path.join(__filename,"../../../public/img/"+result[0].img)
        fs.unlinkSync(deleteimg)
        res.status(200).json ("Producto eliminado") 
}

export const PatchProducts = async(req,res)=>{
    try
    {
        const {id} = req.params
        const {idcategoria,nombre,descripcion,total} = req.body;
        const [result] = await pool.query("UPDATE producto SET  Id_Categoria= IFNULL(?,Id_Categoria), Nombre = IFNULL(?, Nombre), Descripcion = IFNULL(?,Descripcion), Total = IFNULL(?, Total) WHERE Id = ?",[idcategoria,nombre,descripcion,total,id])
        if(result.affectedRows == 0) return res.status(404).json("producto no encontrado");
        const [rows]  = await pool.query ("SELECT * FROM producto WHERE Id = ?",[id]);
        res.json(rows[0]);
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
    
}

export const putImg = async (req,res) =>
{
    try
    {
        const {id} = req.params
        const [rows]  = await pool.query ("SELECT * FROM producto WHERE Id = ?",[id]);
        const deleteimg = path.join(__filename,"../../../public/img/"+rows[0].img)

        
        if(fs.existsSync(deleteimg)) fs.unlinkSync(deleteimg)
        const img = req.file.filename
        const [result] = await pool.query("UPDATE producto SET img = ? WHERE Id =  ?",[img, id])
        if(result.affectedRows == 0) return res.status(404).json("producto no encontrado");
            res.json(rows[0]);
    }catch(error)
    {
        res.status(500).json("Algo salio mal")
    }
}

