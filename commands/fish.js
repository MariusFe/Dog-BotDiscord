const discord = require('discord.js');
const {token,prefix} = require('../config.json');
let fishData = require("../data/fishUserData.json");
let fishMarketData = require("../data/fishMarketData.json");
const fs = require('fs');

module.exports = {
	name: 'fish',
	description: "Fish fishes using fishing rod",
	usage: "!dog fish",
	execute(message,args,client){


		if (!fishData[message.author.id]){
			invalidCommand(message, "You need to get a fishing rod before fishing! \nTo get your fishing rod use the command `" + prefix + " fish start` or or `" + prefix + " fish help` to get the help.");
			return;
		}
		

		for (var fish in fishMarketData.fishes){
			console.log(fish);
		}



		function invalidCommand(message,error){

    		const embed = new discord.MessageEmbed()
    		.setColor('#FF0000')
    		.setTitle('<:wut:760160064572358696> Error')
    		.setDescription(error);

    		message.channel.send({ embeds: [embed] });
		}
	}
}