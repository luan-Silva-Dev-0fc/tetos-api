function validarDados(req, res, next) {
    const { nome, telefone, cpf_cnpj } = req.body;

    if (!nome) {
        return res.json({
            type: "warning",
            description: "Coluna nome não informada"
        });
    }

    if (!telefone) {
        return res.json({
            type: "warning",
            description: "Coluna telefone não informada"
        });
    }

    if (!cpf_cnpj) {
        return res.json({
            type: "warning",
            description: "Coluna cpf_cnpj não informada"
        });
    }

    next();
}

module.exports = {
    validarDados
}

