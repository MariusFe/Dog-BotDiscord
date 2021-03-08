const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const yahooFinance = require('yahoo-finance');
let stockData = require("../data/userDataStock.json");


module.exports = {
	name: 'stockBalance',
	description: "Show the balance",
	usage: "!dog stock balance",
	execute(message,args,client){

		if(!stockData[message.author.id]){
			invalidCommand(message,"You need to get the fresh start before stonking !\nTry `" + prefix + " stock start` or `" + prefix + " stock help` to get the help.")
			return;
		}

		let symbols1 = new Array();

		for (var item in stockData[message.author.id].balance){
			if(stockData[message.author.id].balance[item].amount > 0){
				symbols1.push(item);
			}
		}

		yahooFinance.quote({
  			symbols: symbols1,
  			modules: ['price'] // see the docs for the full list: https://github.com/pilwon/node-yahoo-finance/blob/master/docs/quote.md
			}, function (err, quotes) {
				if(err){
					invalidCommand(message,err);
					return;
				}
				const embed = new discord.MessageEmbed()
				.setColor('#3368FF')
				.setTitle('Here is your balance ' + message.author.username);

				for(var item1 in symbols1){
					if(symbols1[item1] == stockData[message.author.id].balance[symbols1[item1]].currency){
						//It means the player has a certain currency in his account, we don't need to look for it's price on the market (ie USD on the market is a company)
						embed.addField(symbols1[item1] ,'Amount: ' + stockData[message.author.id].balance[symbols1[item1]].amount + stockData[message.author.id].balance[symbols1[item1]].currency);
					}
					else{
						//This is a share of a company
						var value = quotes[symbols1[item1]].price.regularMarketPrice * stockData[message.author.id].balance[symbols1[item1]].amount;
						var percentage = (quotes[symbols1[item1]].price.regularMarketPrice *  stockData[message.author.id].balance[symbols1[item1]].amount / stockData[message.author.id].balance[symbols1[item1]].valueAtPurchase - 1) * 100;
						embed.addField(quotes[symbols1[item1]].price.shortName + ' (' + quotes[symbols1[item1]].price.symbol + ')','Amount: ' + stockData[message.author.id].balance[symbols1[item1]].amount + '\nValue: ' + value + quotes[symbols1[item1]].price.currencySymbol + ' (' + quotes[symbols1[item1]].price.regularMarketPrice + quotes[symbols1[item1]].price.currencySymbol + ' each)\nSince purchase: ' + percentage + '%');
					}
				}
				message.channel.send(embed);
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