import { pool } from "../db.js";

export const getBreadFlavor = async (req,res)=>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM sabor_pan")
        res.status(200).json(rows)  
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}

export const getBreadFlavorByid = async (req,res) =>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM sabor_pan WHERE Id = ?",[req.params.id]);
        if(rows.length <= 0)res.status(404).json("No se encontro el sabor de pan")
            res.status(200).json(rows[0])
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}

export const PostBreadFlavor = async (req,res)=>{

    try
    {
        const {nombre,precio}  = req.body
        if(!nombre || !precio)  return res.status(400).send("Campo vacio") 
            const [rows] = await pool.query("INSERT INTO sabor_pan (Nombre,Precio) VALUES (?,?)",[nombre,precio])
                res.status(201).json({
                    id: rows.insertId,
                    nombre,
                    precio
                })
    }catch(error){

        return res.status(500).json("Ocurrio un error")
    }
}

export const DeleteBreadFlavor = async (req,res)=>{
    try
    {
        const [rows] = await pool.query("DELETE FROM sabor_pan WHERE Id = ? ",[req.params.id])
        if(rows.affectedRows <= 0)return res.status(404).json("relleno no encontrado")
        res.status(200).json ("sabor de pan eliminado")
    }catch
    {
        return res.status(500).json("Ocurrio un error")
    }
}

export const PatchBreadFlavor = async(req,res)=>{
    try
    {
        const {id} = req.params
        const {nombre,precio} = req.body;
        const [result] = await pool.query("UPDATE sabor_pan SET  Nombre= IFNULL(?,Nombre), Precio = IFNULL(?, Precio)  WHERE Id = ?",[nombre,precio,id])
        if(result.affectedRows == 0) return res.status(404).json("sabor de pan no encontrado");
        const [rows]  = await pool.query ("SELECT * FROM sabor_pan WHERE Id = ?",[id]);
        res.json(rows[0]);
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}