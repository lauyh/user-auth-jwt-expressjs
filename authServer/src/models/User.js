'use strict'

const {db} = require('../../lib/sequelize');
const {Sequelize} = require('sequelize');


const User = db.define('users',{
	id:{
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false,
	},
	username:{
		type: Sequelize.STRING,
		allowNull: false
	},
	email:{
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		isEmail: true
	},
	hash: {
		type: Sequelize.STRING,
		allowNull: false
	},
	status:{
		type: Sequelize.STRING,
		allowNull: false,
		isIn:[['active','banned']],
		defaultValue: 'active',
	},
	roles:{
		type: Sequelize.STRING,
		allowNull: false,
		isIn: [['admin','client','customer support','seller']],
		defaultValue: 'client'
	}
});

module.exports.User = User;


