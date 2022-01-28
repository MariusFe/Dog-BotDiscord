const discord = require('discord.js');
const {token,prefix} = require('../config.json');

module.exports = {
	name: 'sex',
	description: "Introduction of the SAGI Experience game",
	usage: prefix + "sex",
	execute(message,args,client){
		
		client.users.fetch('290543889117609984').then(myUser =>{

    			const embed = new discord.MessageEmbed()
    			.setColor('#3368FF')
    			.setTitle('The SAGI Experience game')
    			.setDescription('Welcome to the SAGI Experience game! A game were you can truely enjoy the life of a SAGI engineer when he graduates from the school!')
    			.setThumbnail('http://www.polytech-angers.fr/_resource/Pages_Bandeau_Illustration/Illustration_sagi.jpg')
    			.addField('Help Page','Remember that every time you can check the help page to know every commands available: `'+prefix+' sex help`')
                .addField('What the hell is this game?','The goal of the game is to collect the maximum of `bon-points`<:bonpoint:927435531321753651> and be the top one in the world!')
                .addField('Ok how?','You will get some bon-points every minute that you will need to claim using the appropriate command')
                .addField('How to increase my earnings per minute?','You can increase your earning by buying the adds that are more and more expensive but you will earn more and more!')
                .addField('How to earn even more?','Complete some contracts by coding some boring apps for some boring companies, you will find the command on the help page.')
                .addField('And even more ????','Claim your QUIF\'s souls that you collect every time you reach 10 millions bons-points. Each one of them give you a bonus of 0.1%.\nWARNING: it removes all the adds you have ever purchased')
                .addField('That\'s all?','Yes or maybe not *wink wink*')
                .addField('A problem? A question?','Reach me on discord!')
    			.setFooter('Made by ' + myUser.tag, myUser.avatarURL());

    			message.channel.send({ embeds: [embed] });
    		})
	}
}