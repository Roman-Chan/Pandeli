import bcrypt, { hash } from "bcrypt";
import token from "jsonwebtoken"
import { pool } from "../db.js";

const jsonTokenn = token;
const encryption = bcrypt;

export const register = async(req,res)=> {
    try
    {
        const data = req.body
        if(!data.Nombre || !data.Gmail || !data.Contraseña) return res.status(400).json("Faltan campos")
        const [rows] = await pool.query("SELECT * FROM usuario where Gmail = ?",[data.Gmail])
        if(rows.length>0)
        {
            res.json({message: "Gmail en uso"})
        }
        else
        {
            const palabra =await encryption.hash(data.Contraseña,10)
            data.Contraseña = palabra;         
                const [user] = await pool.query("INSERT INTO usuario (Nombre,Gmail,Contraseña,id_roles) VALUES (?,?,?,2)",[data.Nombre,data.Gmail,data.Contraseña])
                res.send({
                            id: rows.insertId,
                            data
                        })
        }
    }catch(error)
    {
        res.json("ocurrio un error")
    }
}

export const login = async (req,res) =>{
        try
        {
            const datos  = req.body
            if(!datos.Gmail || !datos.Contraseña)res.status(400).json("Faltan datos")
                const [rows] = await pool.query("SELECT * FROM usuario where Gmail = ?",[datos.Gmail])
                    if(!rows.length>0) return res.status(401).json("Gmail invalido")
                        const Compracion = await encryption.compare(datos.Contraseña,rows[0].Contraseña)
                            if(!Compracion) return res.status(401).json("Contraseña incorrecta")
                                const id = rows[0].id;
                                const rol = rows[0].id_roles;
                                const token = jsonTokenn.sign({id,rol},process.env.JWT_SECRET,{expiresIn: "20m"})
                                res.json(
                                {
                                token
                                })
        }catch
        {
            return res.json("Ocurrio un error")
        }
                
        
};

export const loginAdmin = async (req,res) =>{
        
    const datos  = req.body
    if(!datos.Gmail || !datos.Contraseña)res.status(400).json("Faltan datos")
        const [rows] = await pool.query("SELECT * FROM usuario where Gmail = ? and id_roles = 1",[datos.Gmail])
            if(!rows.length>0) return res.status(401).json("Gmail invalido")
                const Compracion = await encryption.compare(datos.Contraseña,rows[0].Contraseña)
                    if(!Compracion) return res.status(401).json("Contraseña incorrecta")
                        const id = rows[0].id;
                        const rol = rows[0].id_roles;
                        const token = jsonTokenn.sign({id,rol},process.env.JWT_SECRET,{expiresIn: "20m"})
                        res.json(
                        {
                        token
                        })
        

};
