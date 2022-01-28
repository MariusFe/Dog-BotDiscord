const discord = require('discord.js');
const {token,prefix} = require('../config.json');
let sexData = require("../data/sexUserData.json");
const sexDataServer = require("../data/sexServerData.json");

module.exports = {
	name: 'sexProfile',
	description: "Show the profile of the player who ran the command",
	usage: prefix + "sex profile",
	execute(message,args,client){

		if(!sexData[message.author.id]){
			invalidCommand(message, 'You did not start the game yet to receive your first bonus yet: `'+prefix+' sex start`.\nYou can also check the help page about the game: `'+prefix+' sex help`.');
			return;
		}

		const currentTime = new Date();
		const userData = sexData[message.author.id];
		const lastClaim = new Date(userData.lastClaim)
		const timeUnClaim = Math.round((currentTime.getTime() - lastClaim.getTime()) / (1000 * 60));

		
		client.users.fetch(message.author.id).then(myUser =>{

				let totalIncome = 0;
				for (const add in sexDataServer.adds){
					totalIncome += userData.adds[add] * sexDataServer.adds[add].income * (1 + userData.soulClaimed * 0.001);
				}

    			const embed = new discord.MessageEmbed()
    			.setColor('#3368FF')
    			.setThumbnail(myUser.avatarURL())
    			.setTitle(myUser.tag + " - Profile stats")
    			.setDescription('Bons Points: `' + Math.round(userData.bonPoint).toLocaleString() + '`\nLast claimed: `'+ timeUnClaim + "` minutes ago \nIncome: `" + Math.floor(totalIncome).toLocaleString() + "`/min" + "\nQUIF's souls claimed: `" + userData.soulClaimed.toLocaleString() + "` (0.1% bonus for each soul)\nQUIF's souls available: `" + userData.soulAvailable.toLocaleString() + "`");

    			let i =0;
    			let income1 = 0;
    			for (const add in sexDataServer.adds){
    				if(i%3 == 0){
    					embed.addField('\u200b', '\u200b', true);
    					i += 1;
    				}
    				pricePerUnit = sexDataServer.adds[add].price * Math.pow(21/20,userData.adds[add]+1);
    				income1 = userData.adds[add] * sexDataServer.adds[add].income * (1 + userData.soulClaimed * 0.001);
    				embed.addField(sexDataServer.adds[add].emote + " " + sexDataServer.adds[add].desc + " ["+ add + "]", "Amount: `" + userData.adds[add].toLocaleString() + "`- Income: `" + income1.toLocaleString() + "`/min ("+ sexDataServer.adds[add].income.toLocaleString() + "/unit)\nPrice for next:\n`"+Math.round(pricePerUnit).toLocaleString()+"` bons points", true);
    				i += 1;
    			}
    		

    			message.channel.send({ embeds: [embed] });
    		})

		function invalidCommand(message,error){

    		const embed = new discord.MessageEmbed()
    		.setColor('#FF0000')
    		.setTitle('<:wut:760160064572358696> Error')
    		.setDescription(error);

    		message.channel.send({ embeds: [embed] });
		}
	}
}