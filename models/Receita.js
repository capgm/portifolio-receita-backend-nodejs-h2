const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Categoria = require('./Categoria');
const Usuario = require('./Usuario');

const Receita = sequelize.define('Receita', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ingredientes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modoPreparo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  urlImagem: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Receita.belongsTo(Categoria, { foreignKey: 'id_categoria' });
Receita.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Receita;