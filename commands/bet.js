const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const fs = require('fs');
let betData = require("../data/userDataBet.json")

module.exports = {
	name: 'bet',
	description: "Bet money",
	usage: "!dog bet *amount*",
	execute(message,args,client){

		if(parseInt(args[2]) < 0){
			invalidCommand(message,"Nique ta mère");
			return;
		}

		if(!betData[message.author.id]){
			invalidCommand(message,"You need to get the fresh start before betting !");
			return;
		}

		if(betData[message.author.id].balance < parseInt(args[2]) ){
			invalidCommand(message,"You don't have enough dogcoins in your balance !");
			return;
		}

		betData[message.author.id].spent = parseInt(betData[message.author.id].spent) + parseInt(args[2]);

		if(Math.random() <= 0.51){ //won
			betData[message.author.id].balance = parseInt(betData[message.author.id].balance) + parseInt(args[2]);
			const embed = new discord.MessageEmbed()
    			.setColor('#3368FF')
    			.setThumbnail('https://i.ytimg.com/vi/if-2M3K1tqk/maxresdefault.jpg')
    			.setTitle('You won ' + args[2] + ' coins !')
    			.setDescription('You now have ' + betData[message.author.id].balance + ' dogcoins in your balance.')
    		message.channel.send({ embeds: [embed] });
    		betData[message.author.id].earned = parseInt(betData[message.author.id].earned) + parseInt(args[2]);
		}
		else{ //lost
			betData[message.author.id].balance = parseInt(betData[message.author.id].balance) - parseInt(args[2]);
			betData[message.author.id].lost = parseInt(betData[message.author.id].lost) + parseInt(args[2]);
			const embed = new discord.MessageEmbed()
    			.setColor('#FF0000')
    			.setThumbnail('https://i.pinimg.com/originals/89/92/ba/8992ba8a5962114770ad9eb4d6be733c.jpg')
    			.setTitle('You lost ' + args[2] + ' coins...')
    			.setDescription('You now have ' + betData[message.author.id].balance + ' dogcoins left in your balance.')
    		message.channel.send({ embeds: [embed] });
		}

		fs.writeFile("./data/userDataBet.json", JSON.stringify(betData), (err) => {
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
