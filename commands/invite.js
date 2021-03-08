const discord = require('discord.js');
const {token,prefix} = require('../config.json');

module.exports = {
	name: 'invite',
	description: "Show the link to invite the bot on a server",
	usage: "!dog invite",
	execute(message,args,client){
		const embed = new discord.MessageEmbed()
		.setColor('#3368FF')
    	.setTitle('Click on the link to invite the dog bot on your server!')
    	.setDescription('https://discord.com/api/oauth2/authorize?client_id=688456016966451207&permissions=8&scope=bot')
    	.setThumbnail('https://bon-toutou-90.webself.net/file/si939013/1883A4C1-9182-4B76-8F95-C5C770D74901-fi14369250x1000.jpeg')
    	message.channel.send(embed);
	}
}