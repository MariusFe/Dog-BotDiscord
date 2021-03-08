const discord = require('discord.js');
const {token,prefix} = require('../config.json');

module.exports = {
	name: 'invalidCommand',
	description: "Show the invalid command message",
	usage: "!dog count",
	execute(message,args,client){
		const embed = new discord.MessageEmbed()
    	.setColor('#FF0000')
    	.setTitle('<:wut:760160064572358696> Invalid Command')
   	 	.setDescription('Are you sure you are using the correct command ? Type `!dog help` to show all the commands');

    	message.channel.send(embed);
	}
}