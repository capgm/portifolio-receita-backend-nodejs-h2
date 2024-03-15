const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

// Função para criar uma hash da senha
async function criarHashSenha(senha) {
  try {
    // Gere um salt aleatório com custo de processamento 10 (pode ser ajustado conforme necessário)
    const salt = await bcrypt.genSalt(10);

    // Crie uma hash para a senha usando o salt
    const hashSenha = await bcrypt.hash(senha, salt);

    return hashSenha;
  } catch (error) {
    console.error("Erro ao criar a hash da senha:", error);
  }
}

router.post("/signin", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado", islogado: false });
    }

    const senhaCorrespondente = await bcrypt.compare(senha, usuario.senha);

    if (senhaCorrespondente) {
      // Remove a senha da resposta antes de enviá-la
      usuario.senha = "";
      res.status(200).json({ mensagem: "", islogado: true, user: usuario });
    } else {
      res.status(400).json({ mensagem: "A senha está incorreta.", islogado: false });
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor", islogado: false });
  }
});

router.post("/signup", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Já existe um usuário com esse email!", sucesso: false });
    }

    const hashSenha = await criarHashSenha(senha);

    await Usuario.create({ nome, email, senha: hashSenha });
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!", sucesso: true });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor", sucesso: false });
  }
});

module.exports = router;
