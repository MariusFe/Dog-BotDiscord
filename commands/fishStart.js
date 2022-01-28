const discord = require('discord.js');
const {token,prefix} = require('../config.json');
let fishData = require("../data/fishUserData.json");
const fs = require('fs');

module.exports = {
	name: 'fishStart',
	description: "Start playing the fishing game, it makes an entry on the json and gives a starting fishing rod",
	usage: "!dog fish start",
	execute(message,args,client){

		if(fishData[message.author.id]){
			invalidCommand(message,"You already get the fresh start");
			return;
		}

		let date = new Date();

		fishData[message.author.id] = {
			rod: {
				1:{
					usage : 0,
					fish: 0,
					price: 0
				}
			},
			basket: {},
			stats:{
				startDate : date,
				money: 0
			}
		}

		fs.writeFile("./data/fishUserData.json", JSON.stringify(fishData), (err) => {
				if(err) console.log(err)
		});

		const embed = new discord.MessageEmbed()
    		.setColor('#3368FF')
    		.setTitle('You succesfully got your fresh start ! You can now start fishing.')
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