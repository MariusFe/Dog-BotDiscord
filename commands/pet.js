const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const fs = require('fs');
let guild = require("../data/rawUserDataPet.json");

module.exports = {
	name: 'pet',
	description: "Pet the dog once",
	usage: "!dog pet",
	execute(message,args,client){

		if(message.guild == null){
			invalidCommand(message);
			return;
		}
		
		if(!guild[message.guild.id]){
			guild[message.guild.id] = {
				users: {
				}
			}
		}
		if(!guild[message.guild.id].users[message.author.id]){
			guild[message.guild.id].users[message.author.id] = {
				pet: 0
			}
		}
		guild[message.guild.id].users[message.author.id].pet ++;

		fs.writeFile("./data/rawUserDataPet.json", JSON.stringify(guild), (err) => {
			if(err) console.log(err)
		});


		const embed = new discord.MessageEmbed()
    		.setColor('#3368FF')
    		.setThumbnail('https://bon-toutou-90.webself.net/file/si939013/1883A4C1-9182-4B76-8F95-C5C770D74901-fi14369250x1000.jpeg')
    		.setTitle('Thank you master !')
    	message.channel.send(embed);

    	function invalidCommand(message){

    		const embed = new discord.MessageEmbed()
    		.setColor('#FF0000')
    		.setTitle('<:wut:698139865480429662> Not in DM')
    		.setDescription('This command cannot work in DM (until now)');

    		message.channel.send(embed);
		}
	}
}