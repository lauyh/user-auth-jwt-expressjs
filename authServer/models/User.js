'use strict'

const {db} = require('../lib/sequelize');
const {DataTypes} = require('sequelize');


const User = db.define('users',{
	id:{
		type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	username:{
		type: DataTypes.STRING,
		allowNull: false
	},
	email:{
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		isEmail: true
	},
	hash: {
		type: DataTypes.STRING,
		allowNull: false
	},
	status:{
		type: DataTypes.STRING,
		allowNull: false,
		isIn:[['active','banned']],
		defaultValue: 'active',
	},
	roles:{
		type: DataTypes.STRING,
		allowNull: false,
		isIn: [['admin','client','customer support','seller']],
		defaultValue: 'client'
	}
});

module.exports.User = User;


