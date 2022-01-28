const discord = require('discord.js');
const {token,prefix} = require('../config.json');

module.exports = {
	name: 'fishHelp',
	description: "Show the list of all the commands for the fishing game",
	usage: prefix + "fish help",
	execute(message,args,client){
		
		client.users.fetch('290543889117609984').then(myUser =>{

    			const embed = new discord.MessageEmbed()
    			.setColor('#3368FF')
    			.setTitle('Fishing Help- dog bot')
    			.setDescription('Description of how to use the dog bot for the fishing game, don\'t forget to use the prefix `' + prefix + '` before typing the command.\nNote that you can totally play this game via DM with the bot !')
    			.setThumbnail('https://bon-toutou-90.webself.net/file/si939013/1883A4C1-9182-4B76-8F95-C5C770D74901-fi14369250x1000.jpeg')
                .addField('fish help','Show this help page')
                .addField('fish start','Start fishing ! It gives you the starting fishing rod.')
                .addField('fish', 'Fish a fish using a fishing rod')
    			.setFooter('Made by ' + myUser.tag, myUser.avatarURL());

    			message.channel.send({ embeds: [embed] });
    		})
	}
}