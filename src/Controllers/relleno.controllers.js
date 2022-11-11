import { pool } from "../db.js"

export const postRelllenos = async (req,res) =>{
    try
    {    const {Nombre,Precio}  = req.body
        if(!Nombre || !Precio) return res.status(400).send("Campo vacio")
            const [rows] = await pool.query("INSERT INTO relleno (Nombre,precio) VALUES (?,?)",[Nombre,Precio])
                res.status(201).json({
                    id: rows.insertId,
                    Nombre,
                    Precio
                })
    }catch(error){
        res.status(500).json("Ocurrio un error")
    }
}

export const getRellenos = async (req,res ) =>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM relleno")
        res.status(200).json(rows) 
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}

export const getRellenosbyid = async (req,res ) =>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM relleno WHERE Id = ?",[req.params.id])
        if(rows.length <= 0)return res.status(404).json({message: "Relleno no buscado"})
        res.json(rows[0]);
    }catch(error){
        return res.status(500).json("Ocurrio un error")
    }
}

export const deleteRellenos = async (req,res) =>{
    try
    {
        const [resultado] = await pool.query("DELETE FROM relleno WHERE Id = ?",[req.params.id])
        if(resultado.affectedRows <= 0)return res.status(404).json({message: "Relleno no encontrado "})
        return res.sendStatus(204)
    }catch(error){
        res.status(500).json("Ocurrio un error")
    }
}

export const updateRellenos = async (req,res) =>{
    try
    {
        const {id} = req.params
        const {Nombre,Precio} = req.body;
        const [resultado] = await pool.query("UPDATE relleno SET Nombre= IFNULL(?,Nombre), Precio = IFNULL(?, Precio) WHERE Id = ?",[Nombre,Precio,id])
        if(resultado.affectedRows == 0) return res.status(404).json({message:"Relleno no encontrado"});
        const [rows]  = await pool.query ("SELECT * FROM relleno WHERE Id = ?",[id]);
        res.json(rows[0]);
    }catch(error)
    {
        return res.status(500).json("Ocurrio un error")
    }
}
