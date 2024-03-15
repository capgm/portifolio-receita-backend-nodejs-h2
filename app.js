const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const categoriaRoutes = require("./routes/categoria");
const receitaRoutes = require("./routes/receita");
const usuarioRoutes = require("./routes/usuario");
const sequelize = require('./database');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// Configurações do banco de dados
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });

// Rotas
app.use("/", categoriaRoutes);
app.use("/", receitaRoutes);
app.use("/", usuarioRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});