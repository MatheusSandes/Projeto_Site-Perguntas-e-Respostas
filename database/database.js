const Sequelize= require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', '810401',{
    host:'localhost',
    dialect:'mysql'
});

module.exports= connection;