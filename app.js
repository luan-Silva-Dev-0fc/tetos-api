const express = require("express");
const cors = require("cors");
const niveisRoutes = require("./src/routes/niveisRoutes");
const imoveisTipoRoutes = require("./src/routes/imoveisTipoRoutes");
const usuariosRoutes = require("./src/routes/usuariosRoutes");
const locatariosRoutes = require("./src/routes/locatariosRoutes");
const { login } = require("./src/controllers/usuariosController");
const { usuarioAutenticado } = require("./src/middlewares/usuarioMiddlewares");

const app = express();

app.use(cors()); //permite que requisições externas acessem as rotas
app.use(express.json()); //transforma o JSON do corpo da requisição em JS

app.get("/", (req, res) => {
    res.send("Olá mundo");
});

app.post("/login", login);

app.use("/niveis", usuarioAutenticado, niveisRoutes);
app.use("/imoveis-tipo", usuarioAutenticado, imoveisTipoRoutes);
app.use("/usuarios", usuarioAutenticado, usuariosRoutes);
app.use("/locatarios", usuarioAutenticado, locatariosRoutes);

//captura JSON inválido enviado no corpo da requisição
app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            type: "error",
            description: "JSON inválido no corpo da requisição: " + err.message
        });
    }
    next(err);
});

app.listen(3000, () => {
    console.log("Servidor on: http://localhost:3000");
});