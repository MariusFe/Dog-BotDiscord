const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const fs = require('fs');
let guild = require("../data/rawUserDataPet.json");
let userJSON = require("../data/userDataPet.json");

module.exports = {
	name: 'count',
	description: "Show the number of petting",
	usage: "!dog count",
	execute(message,args,client){
		
		if(message.guild == null){
			invalidCommand(message);
			return;
		}
		
		var thisGuildCount = 0;
		var totalGuildCount = 0;
		var thisUserCount = 0;
		userJSON = {};

		for(var _guilds in guild){
			for(var _users in guild[_guilds].users){
				if(message.guild.id == _guilds){
					thisGuildCount = thisGuildCount + guild[_guilds].users[_users].pet;
				}
				totalGuildCount = totalGuildCount + guild[_guilds].users[_users].pet;
				if(!userJSON[_users]){
						userJSON[_users] = {
							 pet: 0,
							 position: 0
						}
					}
				if(message.author.id == _users){
					thisUserCount = thisUserCount + guild[_guilds].users[_users].pet;
				}
				userJSON[_users].pet = userJSON[_users].pet + guild[_guilds].users[_users].pet;
			}
		}

		


		const embed = new discord.MessageEmbed()
		.setColor('#3368FF')
		.setTitle('Number of petting')
		.addField('This server','The dog has been petted a total of `'+thisGuildCount+'` times on this server')
		.addField('Overall','The dog has been petted a total of `'+ totalGuildCount +'` times on all the servers')
		.addField(`${message.author.username}`,'You petted a total of `'+ thisUserCount +'` times the dog')
		.setThumbnail(message.author.avatarURL())

		message.channel.send({ embeds: [embed] });

		fs.writeFile("./data/userDataPet.json", JSON.stringify(userJSON), (err) => {
			if(err) console.log(err)
		});
		fs.writeFile("./data/rawUserDataPet.json", JSON.stringify(guild), (err) => {
			if(err) console.log(err)
		});

		function invalidCommand(message){

    		const embed = new discord.MessageEmbed()
    		.setColor('#FF0000')
    		.setTitle('<:wut:698139865480429662> Not in DM')
    		.setDescription('This command cannot work in DM (until now)');

    		message.channel.send({ embeds: [embed] });
		}
	}
}