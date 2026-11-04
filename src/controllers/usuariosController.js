const PRISMA = require("../services");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function buscar(req, res) {
    try {
        const linhas = await PRISMA.usuarios.findMany({
            include: {
                niveis: true
            },

            omit: {
                senha: true
            }
        });
        res.json(linhas);
    } catch (error) {
        res.status(500).json({
            type: "error",
            description: error.message
        });
    }
}

async function criar(req, res) {
    try {
        let { nome, email, senha, n_veis_id } = req.body;

        if (!nome || !email || !senha || !n_veis_id) {
            return res.status(400).json({
                type: "warning",
                description: "nome, email, senha e n_veis_id são obrigatórios"
            });
        }

        senha = await bcrypt.hash(senha, 10);

        await PRISMA.usuarios.create({
            data: {
                nome,
                email,
                senha,
                n_veis_id
            }
        });

        res.json({
            type: "success",
            description: "Registro criado com sucesso."
        })

    } catch (error) {
        res.status(500).json({
            type: "error",
            description: error.message
        });
    }
}

async function editar(req, res) {
    try {
        const { nome, email, senha, n_veis_id } = req.body;
        const { id } = req.params;

        const dados = {};
        if (nome !== undefined) dados.nome = nome;
        if (email !== undefined) dados.email = email;
        if (senha) dados.senha = senha;
        if (n_veis_id !== undefined) dados.n_veis_id = n_veis_id;

        if (dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha, 10)
        }

        await PRISMA.usuarios.update({
            where: {
                id
            },
            data: dados
        });

        res.json({
            type: "success",
            description: "Registro atualizado com sucesso."
        })

    } catch (error) {
        res.status(500).json({
            type: "error",
            description: error.message
        });
    }
}

async function deletar(req, res) {
    try {
        const { id } = req.params;

        await PRISMA.usuarios.delete({
            where: {
                id
            }
        });

        res.json({
            type: "success",
            description: "Registro deletado com sucesso."
        })

    } catch (error) {
        res.status(500).json({
            type: "error",
            description: error.message
        });
    }
}

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                type: "warning",
                description: "email e senha são obrigatórios"
            });
        }

        let usuario = await PRISMA.usuarios.findFirst({
            where: {
                email
            }
        });

        if (!usuario) {
            return res.status(401).json({
                type: "warning",
                description: "email ou senha incorreto"
            })
        }

        let senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({
                type: "warning",
                description: "email ou senha incorreto"
            })
        }

        let token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            type: "success",
            description: "login realizado com sucesso",
            token
        })

    } catch (error) {
        res.status(500).json({
            type: "error",
            description: error.message
        })
    }
}

module.exports = {
    buscar,
    criar,
    editar,
    deletar,
    login
}
