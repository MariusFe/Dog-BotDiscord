const discord = require('discord.js');
const {token,prefix} = require('../config.json');
let sexData = require("../data/sexUserData.json");
const sexDataServer = require("../data/sexServerData.json");
const fs = require('fs');

module.exports = {
	name: 'sexClaimSoul',
	description: "Claim the available souls of the player",
	usage: prefix + "sex claim soul",
	execute(message,args,client){

		if(!sexData[message.author.id]){
			invalidCommand(message, 'You did not start the game yet to receive your first bonus yet: `'+prefix+' sex start`.\nYou can also check the help page about the game: `'+prefix+' sex help`.');
			return;
		}

		const userData = sexData[message.author.id];

		if(userData.soulAvailable == 0){
			invalidCommand(message, 'You do not have any QUIF\'s souls available');
			return;
		}

		for (const add in userData.adds){
			sexData[message.author.id].adds[add] = 0;
		}

		sexData[message.author.id].adds.deg = 1;
		sexData[message.author.id].soulClaimed += sexData[message.author.id].soulAvailable;
		sexData[message.author.id].bonPoint = 0;
		sexData[message.author.id].pendingBonPoint = 0;

		const bonus = sexData[message.author.id].soulClaimed * 0.1;

  		const embed = new discord.MessageEmbed()
    	.setColor('#3368FF')
    	.setThumbnail('http://www.polytech-angers.fr/_resource/Pages_Bandeau_Illustration/Illustration_sagi.jpg')
    	.setTitle(message.author.username +" - You succesfully claimed your souls :angel:")
    	.addField(':chart_with_upwards_trend: You claimed `'+sexData[message.author.id].soulAvailable.toLocaleString()+'` QUIF\'s souls','Well done')
    	.addField(':angel: You now have `'+sexData[message.author.id].soulClaimed.toLocaleString()+'` QUIF\'s souls', 'You earn now `'+bonus.toLocaleString()+'`% more at each bons points claims')
    	.addField(':x: Keep in mind that it also reset all your adds','You still have one degree in your adds');

    	message.channel.send({ embeds: [embed] });


		sexData[message.author.id].soulAvailable = 0;

		fs.writeFile("./data/sexUserData.json", JSON.stringify(sexData), (err) => {
				if(err) console.log(err)
		});

		function invalidCommand(message,error){

    		const embed = new discord.MessageEmbed()
    		.setColor('#FF0000')
    		.setTitle('<:wut:760160064572358696> Error')
    		.setDescription(error);

    		message.channel.send({ embeds: [embed] });
		}
	}
}