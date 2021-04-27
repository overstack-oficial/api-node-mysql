const { sequelize } = require('../../config/connection');
const Sequelize = require('sequelize');

const User = sequelize.define('users', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
})

//Cria a tabela (Depois, deixar comentado)
// User.sync({ force: true })

module.exports = User;