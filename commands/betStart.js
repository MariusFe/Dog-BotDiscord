const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const fs = require('fs');
let betData = require("../data/userDataBet.json")

module.exports = {
	name: 'betStart',
	description: "Give a fresh start to any player who start the betting game, it is required to start the game by any way",
	usage: "!dog bet start",
	execute(message,args,client){
		if(betData[message.author.id]){
			invalidCommand(message,"You already get the fresh start");
			return;
		}

		betData[message.author.id] = {
			balance: 2000,
			earned: 0,
			spent: 0,
			lost: 0,
			given: 0
		}

		fs.writeFile("./data/userDataBet.json", JSON.stringify(betData), (err) => {
			if(err) console.log(err)
		});

		const embed = new discord.MessageEmbed()
    		.setColor('#3368FF')
    		.setTitle('You succesfully got your fresh start ! You can now start betting.')
    	message.channel.send({ embeds: [embed] });

		function invalidCommand(message,error){

    		const embed = new discord.MessageEmbed()
    			.setColor('#FF0000')
    			.setTitle('<:wut:760160064572358696> Error')
    			.setDescription(error);

    		message.channel.send({ embeds: [embed] });
		}
	}
}