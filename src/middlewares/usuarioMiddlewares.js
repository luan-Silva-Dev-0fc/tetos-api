const jwt = require("jsonwebtoken");

function usuarioAutenticado(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            type: "warning",
            description: "token é necessário"
        });
    }

    // "Bearer <token>" -> pega só o token (posição 1)
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                type: "error",
                description: "token inválido"
            });
        }
        req.usuario = decoded;
        next();
    });
}

module.exports = { usuarioAutenticado };
