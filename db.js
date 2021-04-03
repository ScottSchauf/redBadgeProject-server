const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Applejacks1234@localhost:5432/red-badge-project");

module.exports = sequelize;