const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const fs = require('fs');
let betData = require("../data/userDataBet.json")

module.exports = {
	name: 'betGive',
	description: "Give money",
	usage: "!dog bet give id amount",
	execute(message,args,client){
		return;
	}
}