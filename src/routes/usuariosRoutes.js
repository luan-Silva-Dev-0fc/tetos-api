const { buscar, criar, editar, deletar, login } = require("../controllers/usuariosController");
const { usuarioAutenticado } = require("../middlewares/usuarioMiddlewares");
const rotas = require("express").Router();

rotas.get("/", buscar);
rotas.post("/", criar);
rotas.post("/login", login);
rotas.put("/:id", editar);
rotas.delete("/:id", deletar);



module.exports = rotas;
