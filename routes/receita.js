const express = require("express");
const router = express.Router();
const Receita = require("../models/Receita");

// Rota POST para criar uma nova receita
router.post("/receitas", async (req, res) => {
    const { nome, id_usuario, id_categoria, ingredientes, modoPreparo } = req.body;

    try {
        const novaReceita = await Receita.create({
            nome,
            id_usuario,
            id_categoria,
            ingredientes,
            modoPreparo
        });
        res.status(201).json({ message: "Receita criada com sucesso", receita: novaReceita });
    } catch (error) {
        console.error("Erro ao criar nova receita:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

// Rota GET para listar todas as receitas
router.get("/receitas", async (req, res) => {
    try {
        const receitas = await Receita.findAll();
        res.json(receitas);
    } catch (error) {
        console.error("Erro ao buscar receitas:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

// Rota GET para obter uma receita pelo ID
router.get("/receita/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const receita = await Receita.findByPk(id);
        if (!receita) {
            res.status(404).json({ message: "Receita não encontrada" });
            return;
        }
        res.json(receita);
    } catch (error) {
        console.error("Erro ao buscar receita por ID:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

// Rota GET para consultar receitas por categoria e/ou nome
router.get("/receitas/consulta/:id_categoria/:nome", async (req, res) => {
    const id_categoria = req.params.id_categoria;
    const nome = req.params.nome;

    try {
        let whereClause = {};
        if (id_categoria !== '-1') {
            whereClause.id_categoria = id_categoria;
        }
        if (nome) {
            whereClause.nome = { [Sequelize.Op.like]: `%${nome}%` };
        }

        const receitas = await Receita.findAll({ where: whereClause });
        res.json(receitas);
    } catch (error) {
        console.error("Erro ao consultar receitas:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

// Rota PUT para atualizar uma receita pelo ID
router.put("/receitas/:id", async (req, res) => {
    const id = req.params.id;
    const updatedReceita = req.body;

    try {
        const receita = await Receita.findByPk(id);
        if (!receita) {
            res.status(404).json({ message: "Receita não encontrada" });
            return;
        }

        await Receita.update(updatedReceita, { where: { id } });
        res.json({ message: "Receita atualizada com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar receita:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

// Rota DELETE para excluir uma receita pelo ID
router.delete("/receitas/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const receita = await Receita.findByPk(id);
        if (!receita) {
            res.status(404).json({ message: "Receita não encontrada" });
            return;
        }

        await Receita.destroy({ where: { id } });
        res.json({ message: "Receita excluída com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir receita:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

module.exports = router;
