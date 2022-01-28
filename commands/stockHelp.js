const discord = require('discord.js');
const {token,prefix} = require('../config.json');

module.exports = {
	name: 'stockHelp',
	description: "Show the list of all the commands for the stonking game",
	usage: prefix + " stock help",
	execute(message,args,client){
		
		client.users.fetch('290543889117609984').then(myUser =>{

    			const embed = new discord.MessageEmbed()
    			.setColor('#3368FF')
    			.setTitle('Stonking Help- dog bot')
    			.setDescription('Description of how to use the dog bot for the stonking game, don\'t forget to use the prefix `' + prefix + '` before typing the command.\n THIS IS JUST A GAME. It does not involve real money nor influence the real stock market. Please know that I am not accountable for any risks you take on the real market.\n To know the symbol to use for a company, go to [finance.yahoo.com](finance.yahoo.com), search for the desired item and chose the symbol in between the brackets.\n To start stonking, use the `stock start`. You will get 10 BTC-USD that you will need to sell in order to buy other things.\nNote that you can totally play this game via DM with the bot !')
    			.setThumbnail('https://bon-toutou-90.webself.net/file/si939013/1883A4C1-9182-4B76-8F95-C5C770D74901-fi14369250x1000.jpeg')
                .addField('stock help','Show this help page')
                .addField('stock start','Start stonking ! It also gives you 10 BTC-USD that you will need to sell')
    			.addField('stock buy *object* *amount*', 'Buy a certain amount of a desired share (note that you can buy a float amount)')
                .addField('stock buy *object* all', 'Buy all the shares you can get with your current corresponding currency')
                .addField('stock sell *object* *amount*', 'Sell a certain amount of a desired share (note that you can sell a float amount)')
                .addField('stock sell *object* all', 'Sell all of your share of a desired company')
                .addField('stock balance','Show you current balance of all the items you have')
                .addField('soon:tm: convert *FromThisCurrency* *ToThisCurrency* *amount*','Convert your currency into another one, can help to buy shares in other stock markets')
    			.setFooter('Made by ' + myUser.tag, myUser.avatarURL());

    			message.channel.send({ embeds: [embed] });
    		})
	}
}