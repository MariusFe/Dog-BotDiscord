const discord = require('discord.js');
const {token,prefix} = require('../config.json');
let sexData = require("../data/sexUserData.json");
const sexDataServer = require("../data/sexServerData.json");
const fs = require('fs');

module.exports = {
	name: 'sexClaim',
	description: "Claim the bonPoint of the player",
	usage: prefix + "sex claim",
	execute(message,args,client){

		if(!sexData[message.author.id]){
			invalidCommand(message, 'You did not start the game yet to receive your first bonus yet: `'+prefix+' sex start`.\nYou can also check the help page about the game: `'+prefix+' sex help`.');
			return;
		}

		const currentTime = new Date();
		const userData = sexData[message.author.id];
		const lastClaim = new Date(userData.lastClaim);
		const timeUnClaim = Math.round((currentTime.getTime() - lastClaim.getTime()) / (1000 * 60));		
		let totalIncome = 0;
		for (const add in sexDataServer.adds){
			totalIncome += userData.adds[add] * sexDataServer.adds[add].income * (1 + userData.soulClaimed * 0.001);
		}

		const earnings = Math.round(totalIncome * timeUnClaim);


		const soulsGained = Math.floor((earnings + userData.pendingBonPoint) / 10000000);
		const pending = Math.floor((userData.pendingBonPoint + earnings) % 10000000);

		sexData[message.author.id].bonPoint += earnings;
		sexData[message.author.id].lastClaim = new Date();
		sexData[message.author.id].pendingBonPoint = pending;
		sexData[message.author.id].soulAvailable += soulsGained;
		sexData[message.author.id].everGained += earnings;

		fs.writeFile("./data/sexUserData.json", JSON.stringify(sexData), (err) => {
				if(err) console.log(err)
		});


  		const embed = new discord.MessageEmbed()
    	.setColor('#3368FF')
    	.setThumbnail('http://www.polytech-angers.fr/_resource/Pages_Bandeau_Illustration/Illustration_sagi.jpg')
    	.setTitle(message.author.username +" - You succesfully claimed your bons points <:bonpoint:927435531321753651>")
    	.addField(':chart_with_upwards_trend: You earned `'+earnings.toLocaleString()+'` bons points', '`'+Math.round(totalIncome).toLocaleString()+'`/min for `'+timeUnClaim+'`minutes')
    	.addField('<:bonpoint:927435531321753651> You now have `'+sexData[message.author.id].bonPoint.toLocaleString()+'` bons points', 'Keep grinding you will get there!')
    	.addField(':angel: You gained `'+ soulsGained.toLocaleString()+'` QUIF\'s souls', 'You now have `'+userData.soulAvailable.toLocaleString()+'` QUIF\'s souls available and `'+userData.soulClaimed.toLocaleString()+'` QUIF\'s souls claimed');

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