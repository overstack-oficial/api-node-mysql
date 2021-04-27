const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');

class Database {
    constructor(){
        this.mongoDataBase();
        this.mysqlDataBase();
        this.sequelize;
    }

    mysqlDataBase(){
        this.sequelize = new Sequelize('overstack', 'root', '123456', {
            host: 'localhost',
            // port: '41890',
            dialect: 'mysql'
        });

        this.sequelize.authenticate()
        .then(() => {
            console.log("Conexão com MySQL realizado com sucesso");
        })
        .catch(err => {
            console.log(err)
        })
    }

    mongoDataBase(){
        this.connection = mongoose.connect('mongodb+srv://kaioadmin:123456kaio@nodejs.xkmwn.mongodb.net/overstack?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Conexão realizada com MongoDB com sucesso");
        }).catch((error)=>{
            console.log(`Error: ${error}`);
        })
    }

}

module.exports = new Database();