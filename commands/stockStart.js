const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const yahooFinance = require('yahoo-finance');
const fs = require('fs');
let stockData = require("../data/userDataStock.json");


module.exports = {
	name: 'stockStart',
	description: "Start using the bot to play with the stock market, it makes an entry on the json and gives 10 bitcoins",
	usage: "!dog stock start",
	execute(message,args,client){

		if(stockData[message.author.id]){
			invalidCommand(message,"You already get the fresh start");
			return;
		}

		let date = new Date();

		stockData[message.author.id] = {
			balance: {
				'USD': {
					amount: 0,
					dateOfPurchase: date,
					currency: 'USD',
					valueAtPurchase: 0
				},
				'BTC-USD': {
					amount: 10,
					dateOfPurchase: date,
					currency: 'USD',
					valueAtPurchase: 0
				}
			}
		}

		yahooFinance.quote({
  			symbol: 'BTC-USD',
  			modules: ['price'] // see the docs for the full list: https://github.com/pilwon/node-yahoo-finance/blob/master/docs/quote.md
			}, function (err, quotes) {
				if(err){
					invalidCommand(message,err);
					return;
				}
				stockData[message.author.id].balance['BTC-USD'].valueAtPurchase = quotes.price.regularMarketPrice * 10;
				fs.writeFile("./data/userDataStock.json", JSON.stringify(stockData), (err) => {
					if(err) console.log(err)
				});
			}
		);



		const embed = new discord.MessageEmbed()
    		.setColor('#3368FF')
    		.setTitle('You succesfully got your fresh start ! You can now start stonking.')
    	message.channel.send(embed);

		function invalidCommand(message,error){

    		const embed = new discord.MessageEmbed()
    		.setColor('#FF0000')
    		.setTitle('<:wut:760160064572358696> Error')
    		.setDescription(error);

    		message.channel.send(embed);
		}
	}
}