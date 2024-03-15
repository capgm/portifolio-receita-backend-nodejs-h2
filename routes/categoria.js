const express = require("express");
const router = express.Router();
const Categoria = require("../models/Categoria");

router.get("/categorias", async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

module.exports = router;