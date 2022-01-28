const discord = require('discord.js');
const {token,prefix} = require('../config.json');

module.exports = {
	name: 'sexHelp',
	description: "Show the list of all the commands for the SAGI Experience game",
	usage: prefix + "sex help",
	execute(message,args,client){
		
		client.users.fetch('290543889117609984').then(myUser =>{

    			const embed = new discord.MessageEmbed()
    			.setColor('#3368FF')
    			.setTitle('SAGI Experience Help- dog bot')
    			.setDescription('Description of how to use the dog bot for the SAGI Experience game, don\'t forget to use the prefix `' + prefix + '` before typing the command.\nNote that you can totally play this game via DM with the bot !')
    			.setThumbnail('https://bon-toutou-90.webself.net/file/si939013/1883A4C1-9182-4B76-8F95-C5C770D74901-fi14369250x1000.jpeg')
                .addField('sex','Show the presentation of the game')
                .addField('sex help','Show this help page')
                .addField('sex start','Start the SAGI Experience game ! It gives you an engineering degree to start your life.')
                .addField('sex profile','Display your profile, your stats, your adds, your QUIF\'s souls and more!')
                .addField('sex buy *name_of_add* *amount*', 'Buy a specified amount of add, use the name between the [] that you see in the profile. Note that the price increases every time you buy one')
    			.setFooter('Made by ' + myUser.tag, myUser.avatarURL());

    			message.channel.send({ embeds: [embed] });
    		})
	}
}