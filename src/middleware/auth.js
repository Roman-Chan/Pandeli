import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
        const token = req.header("Authorization");
        if (!token){
            return res.status(401).json("Acceso denegado, proporcione un token");
        }
        jwt.verify(token, process.env.JWT_SECRET,(error,decoded) =>
        {
            if(error)
            {
                res.status(401).json("Acceso denegado token expiro o es incorrecto")
            }else
            {
                next();
            }
        });
    
};

export const admin = (req, res, next) => {
    const token = req.header("Authorization");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (auth && [1].includes(decoded.rol)) {
        next();
        } else {
            res.status(401).send("ACCESO DENEGADO");
        }
}

export const user = (req, res, next) => {
    const token = req.header("Authorization");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (auth && [2].includes(decoded.rol)){
        res.status(200);
        next();
        } else {
            res.status(401).send("Acceso denegado");
        }
}


export const fullAccess = (req, res, next) => {
    const token = req.header("Authorization");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (auth && [1,2].includes(decoded.rol)){
        res.status(200);
        next();
        } else {
            res.status(401).send("Acceso denegado");
        }
}