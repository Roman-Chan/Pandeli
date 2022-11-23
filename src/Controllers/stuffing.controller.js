import { pool } from "../db.js";

export const getStuffing = async (req,res)=>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM relleno")
        res.status(200).json(rows)  
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}

export const getStuffingByid = async (req,res) =>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM relleno WHERE Id = ?",[req.params.id]);
        if(rows.length <= 0)res.status(404).json("No se encontro el relleno")
            res.status(200).json(rows[0])
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}

export const PostStuffing = async (req,res)=>{

    try
    {
        const {nombre,precio}  = req.body
        if(!nombre || !precio)  return res.status(400).send("Campo vacio") 
            const [rows] = await pool.query("INSERT INTO relleno (Nombre,Precio) VALUES (?,?)",[nombre,precio])
                res.status(201).json({
                    id: rows.insertId,
                    nombre,
                    precio
                })
    }catch(error){

        return res.status(500).json("Ocurrio un error")
    }
}

export const DeleteStuffing = async (req,res)=>{
    try
    {
        const [rows] = await pool.query("DELETE FROM relleno WHERE Id = ? ",[req.params.id])
        if(rows.affectedRows <= 0)return res.status(404).json("relleno no encontrado")
        res.status(200).json ("relleno eliminadas")
    }catch
    {
        return res.status(500).json("Ocurrio un error")
    }
}

export const PatchStuffing = async(req,res)=>{
    try
    {
        const {id} = req.params
        const {nombre,precio} = req.body;
        const [result] = await pool.query("UPDATE relleno SET  Nombre= IFNULL(?,Nombre), Precio = IFNULL(?, Precio)  WHERE Id = ?",[nombre,precio,id])
        if(result.affectedRows == 0) return res.status(404).json("piezas no encontrado");
        const [rows]  = await pool.query ("SELECT * FROM piezas WHERE Id = ?",[id]);
        res.json(rows[0]);
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
    
}