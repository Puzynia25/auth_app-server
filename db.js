const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.POSTGRES_URL, {
    dialect: "postgres",
});
