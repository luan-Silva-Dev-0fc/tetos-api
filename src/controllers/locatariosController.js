const PRISMA = require("../services");

async function buscar(req, res) {
    try {
        const linhas = await PRISMA.locatarios.findMany();
        res.json(linhas);
    } catch (error) {
        res.json({
            type: "error",
            description: error.message
        });
    }

}

async function criar(req, res) {
    try {
        await PRISMA.locatarios.create({
            data: req.body
        });

        res.json({
            type: "success",
            description: "Registro criado com sucesso."
        })

    } catch (error) {
        res.json({
            type: "error",
            description: error.message
        });
    }
}

async function editar(req, res) {
    try {
        const { id } = req.params;

        await PRISMA.locatarios.update({
            where: {
                id
            },
            data: {
                ...req.body,
                updatedAt: new Date()
            }
        });

        res.json({
            type: "success",
            description: "Registro atualizado com sucesso."
        })

    } catch (error) {
        res.json({
            type: "error",
            description: error.message
        });
    }
}

async function deletar(req, res) {
    try {
        const { id } = req.params;

        await PRISMA.locatarios.delete({
            where: {
                id
            }
        });

        res.json({
            type: "success",
            description: "Registro deletado com sucesso."
        })

    } catch (error) {
        res.json({
            type: "error",
            description: error.message
        });
    }
}

module.exports = {
    buscar,
    criar,
    editar,
    deletar
}

