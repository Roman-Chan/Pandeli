import { pool } from "../db.js"

export const post = async (req,res) =>{
    try
    {
        const {Nombre,Precio}  = req.body
        if(!Nombre || !Precio || !table) return res.status(400).send("Campo vacio")
            const [rows] = await pool.query("INSERT INTO sabor_bocadillo (Nombre,precio) VALUES (?,?)",[Nombre,Precio])
                res.status(201).json({
                    id: rows.insertId,
                    Nombre,
                    Precio
                })
    }
    catch(error)
    {
        return res.status(500).send("Ocurrio un error");
    }
}

export const get = async (req,res ) =>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM sabor_bocadillo")
        res.status(200).json(rows) 
    }catch(error)
    {
        res.status(500).json("Ocurrio un error")
    }
}

export const getbyid = async (req,res ) =>{
    try
    {
        const [rows] = await pool.query("SELECT * FROM sabor_bocadillo WHERE Id = ?",[req.params.id])
        if(rows.length <= 0)return res.status(404).json("sabor de bocadillo no buscado")
        res.json(rows[0]);
    }catch(error){
        return res.status(500).json("Ocurrio un error")
    }
}

export const deleteS = async (req,res) =>{
    try
    {
        const [resultado] = await pool.query("DELETE FROM sabor_bocadillo WHERE Id = ?",[req.params.id])
        if(resultado.affectedRows <= 0)return res.status(404).json("sabor de bocadillo no encontrado ")
        return res.sendStatus(204)
    }catch(error){
        res.status(500).json("Ocurrio un error")
    }
}

export const update = async (req,res) =>{
    try
    {
        const {id} = req.params
        const {Nombre,Precio} = req.body;
        const [resultado] = await pool.query("UPDATE sabor_bocadillo SET Nombre= IFNULL(?,Nombre), Precio = IFNULL(?, Precio) WHERE Id = ?",[Nombre,Precio,id])
        if(resultado.affectedRows == 0) return res.status(404).json({message:"sabor de bocadillo no encontrado"});
        const [rows]  = await pool.query ("SELECT * FROM relleno WHERE Id = ?",[id]);
        res.json(rows[0]);
    }catch(error)
    {
        return res.status(500).json("Ocurrio un error")
    }
}
