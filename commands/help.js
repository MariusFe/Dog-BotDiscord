const discord = require('discord.js');
const {token,prefix} = require('../config.json');

module.exports = {
	name: 'help',
	description: "Show the list of all the commands",
	usage: "!dog help",
	execute(message,args,client){
		
		client.users.fetch('290543889117609984').then(myUser =>{

    			const embed = new discord.MessageEmbed()
    			.setColor('#3368FF')
    			.setTitle('Help - dog bot')
    			.setDescription('Description of all the commands of the dog bot, don\'t forget to use the prefix `' + prefix + '` before typing the command')
    			.setThumbnail('https://bon-toutou-90.webself.net/file/si939013/1883A4C1-9182-4B76-8F95-C5C770D74901-fi14369250x1000.jpeg')
    			.addField('help','Show this help page')
    			.addField('pet', 'Pet the dog once')
    			.addField('pet count', 'Show the total number of petting')
                .addField('invite','Show the link to invite the bot on your server')
                .addField('weather','Show the current weather in Angers, France')
    			//.addField('pet top', 'Show the top users of this server')
    			//.addField('pet top total', 'Show the top users worldwide')
    			.setFooter('Made by ' + myUser.tag, myUser.avatarURL());

    			message.channel.send(embed);
    		})
	}
}