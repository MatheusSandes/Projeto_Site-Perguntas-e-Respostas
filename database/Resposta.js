const Sequelize= require("sequelize");
const connection = require("./database");

const Resposta= connection.define("resposta", {
    corpo: {
        type:Sequelize.TEXT,
        allowNull: false
    },
    perguntaID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false}); // sintoniza o model com o banco de dados

module.exports = Resposta; //para poder utilizar esse modulo fora desse arquivo