const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const fs = require('fs');
let guild = require("../data/rawUserDataPet.json");
let userJSON = require("../data/userDataPet.json");

module.exports = {
	name: 'top',
	description: "Show the top users of the server, and the position of the user asking for it",
	usage: "!dog top",
	execute(message,args,client){

		if(message.guild == null){
			invalidCommand(message);
			return;
		}

		userJSON = {};

		var thisUserCount = 0;

		for(var _guilds in guild){
			for(var _users in guild[_guilds].users){
				if(!userJSON[_users]){
						userJSON[_users] ={
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
		.setColor()
		.setTitle()
		.setDescription()
		


		for(var i in userJSON){
			if(userJSON[i] == message.author.id){

			}
		}

		fs.writeFile("./data/userDataPet.json", JSON.stringify(userJSON), (err) => {
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