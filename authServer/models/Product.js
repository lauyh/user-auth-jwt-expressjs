'use strict'

const {db} = require('../lib/sequelize');
const {DataTypes} = require('sequelize');

const Product = db.define('products',{
    id: {
        type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

module.exports = Product;