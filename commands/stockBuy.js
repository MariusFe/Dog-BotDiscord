const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const yahooFinance = require('yahoo-finance');
const fs = require('fs');
let stockData = require("../data/userDataStock.json");


module.exports = {
	name: 'stockBuy',
	description: "Buy a certain amount of anything you want (that is available on finance.yahoo.com)",
	usage: "!dog stock buy object amount",
	execute(message,args,client){

		if(!stockData[message.author.id]){
			invalidCommand(message,"You need to get the fresh start before stonking !\nTry `" + prefix + " stock start` or `" + prefix + " stock help` to get the help.")
			return;
		}

		args[3] = args[3].toUpperCase();

		if(args[4] == 'all'){

			yahooFinance.quote({
  			symbol: args[3],
  			modules: ['price'] // see the docs for the full list: https://github.com/pilwon/node-yahoo-finance/blob/master/docs/quote.md
			}, function (err, quotes) {
				if(err){
					invalidCommand(message,err);
					return;
				}
				if(!stockData[message.author.id].balance[quotes.price.currency]){
					invalidCommand(message,"You don't have " + quotes.price.currency + " in your account.");
					return;
				}

				var price = quotes.price.regularMarketPrice;
				let date = new Date();
				var amount = stockData[message.author.id].balance[quotes.price.currency].amount / price;

				stockData[message.author.id].balance[quotes.price.currency].amount = 0;
				stockData[message.author.id].balance[quotes.price.currency].valueAtPurchase = 0;

				if(stockData[message.author.id].balance[args[3]]){
					stockData[message.author.id].balance[args[3]].amount = stockData[message.author.id].balance[args[3]].amount + amount;
					stockData[message.author.id].balance[args[3]].valueAtPurchase = stockData[message.author.id].balance[args[3]].valueAtPurchase + (amount*price);
				}
				else{
					stockData[message.author.id].balance[args[3]] = {
						amount: amount,
						dateOfPurchase: date,
						currency: quotes.price.currency,
						valueAtPurchase: amount * price
					}
				}
				fs.writeFile("./data/userDataStock.json", JSON.stringify(stockData), (err) => {
					if(err) console.log(err)
				});
				const embed = new discord.MessageEmbed()
				.setColor('#3368FF')
				.setTitle("You succesfully bought " + amount + " " + args[3] + " shares at " + price + quotes.price.currencySymbol + " each.");

				message.channel.send({ embeds: [embed] });
			});
			return;
		}

		yahooFinance.quote({
  			symbol: args[3],
  			modules: ['price'] // see the docs for the full list: https://github.com/pilwon/node-yahoo-finance/blob/master/docs/quote.md
			}, function (err, quotes) {
				if(err){
					invalidCommand(message,err);
					return;
				}
				
				if(!isNaN(parseFloat(args[4]))){
					var amount = parseFloat(args[4]);
				}
				else{
					invalidCommand(message,"No.");
					return;
				}

				var price = quotes.price.regularMarketPrice;

				if(!stockData[message.author.id].balance[quotes.price.currency] || (amount * price) > stockData[message.author.id].balance[quotes.price.currency].amount){
					invalidCommand(message,"You don't have enough " + quotes.price.currency + " in your account");
					return;
				}

				let date = new Date();

				stockData[message.author.id].balance[quotes.price.currency].amount = stockData[message.author.id].balance[quotes.price.currency].amount - amount * price;
				stockData[message.author.id].balance[quotes.price.currency].valueAtPurchase = stockData[message.author.id].balance[quotes.price.currency].valueAtPurchase - amount * price;

				if(stockData[message.author.id].balance[args[3]]){
					stockData[message.author.id].balance[args[3]].amount = stockData[message.author.id].balance[args[3]].amount + amount;
					stockData[message.author.id].balance[args[3]].valueAtPurchase = stockData[message.author.id].balance[args[3]].valueAtPurchase + (amount*price);
				}
				else{
					stockData[message.author.id].balance[args[3]] = {
						amount: amount,
						dateOfPurchase: date,
						currency: quotes.price.currency,
						valueAtPurchase: amount * price
					}
				}

				fs.writeFile("./data/userDataStock.json", JSON.stringify(stockData), (err) => {
					if(err) console.log(err)
				});
				const embed = new discord.MessageEmbed()
				.setColor('#3368FF')
				.setTitle("You succesfully bought " + amount + " " + args[3] + " shares at " + price + quotes.price.currencySymbol + " each.");
		
				message.channel.send({ embeds: [embed] });
		});




		function invalidCommand(message,error){


    		const embed = new discord.MessageEmbed()
    		.setColor('#FF0000')
    		.setTitle('<:wut:760160064572358696> Error')
    		.setDescription(error);

    		message.channel.send({ embeds: [embed] });

		}
	}
}