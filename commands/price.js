const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const yahooFinance = require('yahoo-finance');


module.exports = {
	name: 'price',
	description: "Show the current price of a share of a desired company",
	usage: "!dog price nameOfTheCompany",
	execute(message,args,client){

		yahooFinance.quote({
  			symbol: args[2],
  			modules: ['price'] // see the docs for the full list: https://github.com/pilwon/node-yahoo-finance/blob/master/docs/quote.md
			}, function (err, quotes) {
				if(err){
					invalidCommand(message,err);
					return;
				}
				message.channel.send("Price of " + quotes.price.shortName + ' ('+ quotes.price.symbol + ") : " + quotes.price.regularMarketPrice + quotes.price.currencySymbol + " (" + quotes.price.regularMarketChangePercent*100 + "% since market opening)");
		});

		function invalidCommand(message,error){

    		const embed = new discord.MessageEmbed()
    		.setColor('#FF0000')
    		.setTitle('<:wut:760160064572358696> Error')
    		.setDescription(error);

    		message.channel.send(embed);
		}
	}
}