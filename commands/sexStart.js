const discord = require('discord.js');
const {token,prefix} = require('../config.json');
let sexData = require("../data/sexUserData.json");
const fs = require('fs');

module.exports = {
	name: 'sexStart',
	description: "Start playing the SAGI Experience game, it makes an entry on the json and give a unique SAGI degree",
	usage: prefix + "sex start",
	execute(message,args,client){

		if(sexData[message.author.id]){
			invalidCommand(message,"You already got the fresh start");
			return;
		}

		let currentTime = new Date();

		sexData[message.author.id] = {
			bonPoint: 0,
			adds: {
				deg: 1,
				pat: 0,
				cof: 0,
				pc: 0,
				rse: 0,
				wink: 0,
				intern: 0,
				monke: 0,
				full: 0,
				raise: 0
			},
			lastClaim: currentTime,
			soulAvailable: 0,
			soulClaimed: 0,
			pendingBonPoint: 0,
			everGained: 0,
			everSpent: 0,
			lastCode: 0
		}

		fs.writeFile("./data/sexUserData.json", JSON.stringify(sexData), (err) => {
				if(err) console.log(err)
		});

		const embed = new discord.MessageEmbed()
    		.setColor('#3368FF')
    		.setThumbnail('http://www.polytech-angers.fr/_resource/Pages_Bandeau_Illustration/Illustration_sagi.jpg')
    		.setTitle('You succesfully got your fresh start !\nYou can now start the SAGI Experience. \nType `'+prefix+" sex profile` to see your stats.")
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