import { pool } from "../db.js";

export const getPieces = async (req,res)=>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM piezas")
        res.status(200).json(rows)  
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}

export const getPiecesByid = async (req,res) =>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM piezas WHERE Id = ?",[req.params.id]);
        if(rows.length <= 0)res.status(404).json("No se encontro las piezas")
            res.status(200).json(rows[0])
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}

export const PostPieces = async (req,res)=>{

    try
    {
        const {tamaño,precio}  = req.body
        if(!precio || !tamaño)  return res.status(400).send("Campo vacio") 
            const [rows] = await pool.query("INSERT INTO piezas (Tamaño,Precio) VALUES (?,?)",[tamaño,precio])
                res.status(201).json({
                    id: rows.insertId,
                    tamaño,
                    precio
                })
    }catch(error){

        return res.status(500).json("Ocurrio un error")
    }
}

export const deletePieces = async (req,res)=>{
    try
    {
        const [rows] = await pool.query("DELETE FROM piezas WHERE Id = ? ",[req.params.id])
        if(rows.affectedRows <= 0)return res.status(404).json("piezas no encontrado")
        res.status(200).json ("piezas eliminadas")
    }catch
    {
        return res.status(500).json("Ocurrio un error")
    }
}

export const PatchPieces = async(req,res)=>{
    try
    {
        const {id} = req.params
        const {tamaño,precio} = req.body;
        const [result] = await pool.query("UPDATE piezas SET  Tamaño= IFNULL(?,Tamaño), Precio = IFNULL(?, Precio)  WHERE Id = ?",[tamaño,precio,id])
        if(result.affectedRows == 0) return res.status(404).json("piezas no encontrado");
        const [rows]  = await pool.query ("SELECT * FROM piezas WHERE Id = ?",[id]);
        res.json(rows[0]);
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
    
}

