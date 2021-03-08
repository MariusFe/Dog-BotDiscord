const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const fs = require('fs');
let betData = require("../data/userDataBet.json")

module.exports = {
	name: 'betStats',
	description: "Show the statistics of the command bet",
	usage: "!dog bet stats",
	execute(message,args,client){


		if(betData == {}){
			invalidCommand(message,"No data yet.");
			return;
		}

		var earned = 0;
		var spent = 0;
		var balance = 0;
		var bestBalance = 0;
		var bestSpent = 0;
		var bestEarned = 0;

		for(var users in betData){
			if(parseInt(betData[users].earned) > bestEarned){
				bestEarned = parseInt(betData[users].earned);
				var userBestEarned = users;}
			if(parseInt(betData[users].spent) > bestSpent){
				bestSpent = parseInt(betData[users].spent);
				var userBestSpent = users;}
			if(parseInt(betData[users].balance) > bestBalance){
				bestBalance = parseInt(betData[users].balance);
				var userBestBalance = users;}
			earned += parseInt(betData[users].earned);
			spent += parseInt(betData[users].spent);
			balance += parseInt(betData[users].balance);
		}

		const embed = new discord.MessageEmbed()
    		.setColor('#3368FF')
    		.setTitle('Stats of betting with dog bot.')
    		.setThumbnail('https://i.imgflip.com/3s2dv9.jpg')
    		.setDescription('Total earned: ' + earned + '\nTotal spent: '+ spent + '\nTotal of all balances: ' + balance);
    	message.channel.send(embed);

		
		client.users.fetch(userBestBalance).then(myUser =>{
			const embed = new discord.MessageEmbed()
    			.setColor('#3368FF')
				.addField('Top Balance: ' + myUser.username, 'With ' + betData[myUser.id].balance + ' dogcoins')
				.setThumbnail(myUser.avatarURL());
			message.channel.send(embed);
		})
		client.users.fetch(userBestEarned).then(myUser =>{
			const embed = new discord.MessageEmbed()
    			.setColor('#3368FF')
				.addField('Top Earned: ' + myUser.username, 'With ' + betData[myUser.id].earned + ' dogcoins earned')
				.setThumbnail(myUser.avatarURL());
			message.channel.send(embed);
		})
		client.users.fetch(userBestSpent).then(myUser =>{
			const embed = new discord.MessageEmbed()
    			.setColor('#3368FF')
				.addField('Top Spent: ' + myUser.username, 'With ' + betData[myUser.id].spent + ' dogcoins spent')
				.setThumbnail(myUser.avatarURL());
			message.channel.send(embed);
		})

    	

		function invalidCommand(message,error){

    		const embed = new discord.MessageEmbed()
    			.setColor('#FF0000')
    			.setTitle('<:wut:760160064572358696> Error')
    			.setDescription(error);

    		message.channel.send(embed);
		}
	}
}