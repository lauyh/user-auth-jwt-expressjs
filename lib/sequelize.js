const {Sequelize} = require('sequelize')
require('dotenv').config({path: require('find-config')('.env')})

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USR, process.env.DB_PASSWORD,{
    host: 'localhost',
    dialect: 'mssql'
})

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  }).finally(() => {
    sequelize.close();
  });