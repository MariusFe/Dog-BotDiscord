const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const fs = require('fs');
let betData = require("../data/userDataBet.json")

module.exports = {
	name: 'balance',
	description: "Check your balance",
	usage: "!dog bet balance",
	execute(message,args,client){

		if(!betData[message.author.id]){
			invalidCommand(message,"You didn't start betting from now on, try the command '!dog bet start'.");
			return;
		}

		client.users.fetch(message.author.id).then(myUser =>{
			const embed = new discord.MessageEmbed()
    			.setColor('#3368FF')
    			.setThumbnail('https://i.ibb.co/YDTpK7C/stonks-Man.png')
    			.setTitle('You have ' + betData[message.author.id].balance + ' in your balance.')
    			.setAuthor(myUser.tag, myUser.avatarURL())
    			.setDescription('Lost: '+betData[message.author.id].lost + '\n Earned: ' + betData[message.author.id].earned);
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