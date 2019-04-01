const Sequelize =  require('sequelize');
const fs = require('fs');
const basename  = path.basename(__filename);

const config = require('../config/config');
const {database, username, password} = config;

let myDB = {};

const sequelize = new Sequelize(database, username, password,{
    timezone: "+08:00"
})

sequelize
    .authenticate()
    .then(() => {
        console.log("mysql is conntected")
    })
    .catch(err => {
        console.log("mysql connect err: ", err)
    })

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !==0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
        var model = sequelize.import(path.join(__dirname,file));
        myDB[model.name] = model;
    });


module.exports = myDB;