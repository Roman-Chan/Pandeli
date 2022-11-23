import { pool } from "../db.js";

export const getSize = async (req,res)=>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM tamaño")
        res.status(200).json(rows)  
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}

export const getSizeByid = async (req,res) =>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM tamaño WHERE Id = ?",[req.params.id]);
        if(rows.length <= 0)res.status(404).json("No se encontro el tamaño de pastel")
            res.status(200).json(rows[0])
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}

export const PostSize = async (req,res)=>{

    try
    {
        const {nombre,precio}  = req.body
        if(!nombre || !precio)  return res.status(400).send("Campo vacio") 
            const [rows] = await pool.query("INSERT INTO tamaño (Nombre,Precio) VALUES (?,?)",[nombre,precio])
                res.status(201).json({
                    id: rows.insertId,
                    nombre,
                    precio
                })
    }catch(error){

        return res.status(500).json("Ocurrio un error")
    }
}

export const DeleteSize = async (req,res)=>{
    try
    {
        const [rows] = await pool.query("DELETE FROM tamaño WHERE Id = ? ",[req.params.id])
        if(rows.affectedRows <= 0)return res.status(404).json("tamaño de pastel no encontrado")
        res.status(200).json ("tamaño de pastel eliminado")
    }catch
    {
        return res.status(500).json("Ocurrio un error")
    }
}

export const PatchSize = async(req,res)=>{
    try
    {
        const {id} = req.params
        const {nombre,precio} = req.body;
        const [result] = await pool.query("UPDATE tamaño SET  Nombre= IFNULL(?,Nombre), Precio = IFNULL(?, Precio)  WHERE Id = ?",[nombre,precio,id])
        if(result.affectedRows == 0) return res.status(404).json("tamaño de pastel no encontrado");
        const [rows]  = await pool.query ("SELECT * FROM tamaño WHERE Id = ?",[id]);
        res.json(rows[0]);
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}