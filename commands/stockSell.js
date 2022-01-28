const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const yahooFinance = require('yahoo-finance');
const fs = require('fs');
let stockData = require("../data/userDataStock.json");


module.exports = {
	name: 'stockSell',
	description: "Sell a certain amount of anything you have in your account",
	usage: "!dog stock sell object amount",
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
				if(!stockData[message.author.id].balance[args[3]] || stockData[message.author.id].balance[args[3]].amount < 0){
					invalidCommand(message,"You don't have " + args[3] + " in your account.");
					return;
				}

				if(stockData[message.author.id].balance[args[3]].currency == args[3]){
					invalidCommand(message,"You can not sell currency. You thought you had me !");
					return;					
				}

				var price = quotes.price.regularMarketPrice;
				let date = new Date();
				var amount = stockData[message.author.id].balance[args[3]].amount;

				stockData[message.author.id].balance[args[3]].valueAtPurchase = 0;
				stockData[message.author.id].balance[args[3]].amount = 0;

				if(stockData[message.author.id].balance[quotes.price.currency]){
					stockData[message.author.id].balance[quotes.price.currency].amount = stockData[message.author.id].balance[quotes.price.currency].amount + amount * price;
					stockData[message.author.id].balance[quotes.price.currency].valueAtPurchase = stockData[message.author.id].balance[quotes.price.currency].valueAtPurchase + amount * price;
				}
				else{
					stockData[message.author.id].balance[quotes.price.currency] = {
						amount: amount * price,
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
				.setTitle("You succesfully sold " + amount + " " + args[3] + " shares at " + price + quotes.price.currencySymbol + " each.");
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

				if(!stockData[message.author.id].balance[args[3]] || stockData[message.author.id].balance[args[3]].amount < amount){
					invalidCommand(message,"You don't have enough " + args[3] + " shares in your account");
					return;
				}

				if(stockData[message.author.id].balance[args[3]].currency == args[3]){
					invalidCommand(message,"You can not sell currency. You thought you had me !");
					return;					
				}

				var price = quotes.price.regularMarketPrice;
				let date = new Date();

				stockData[message.author.id].balance[args[3]].valueAtPurchase = stockData[message.author.id].balance[args[3]].valueAtPurchase - amount *  stockData[message.author.id].balance[args[3]].valueAtPurchase / stockData[message.author.id].balance[args[3]].amount;
				stockData[message.author.id].balance[args[3]].amount = stockData[message.author.id].balance[args[3]].amount - amount;
				

				if(stockData[message.author.id].balance[quotes.price.currency]){
					stockData[message.author.id].balance[quotes.price.currency].amount = stockData[message.author.id].balance[quotes.price.currency].amount + amount * price;
					stockData[message.author.id].balance[quotes.price.currency].valueAtPurchase = stockData[message.author.id].balance[quotes.price.currency].valueAtPurchase + amount * price;
				}
				else{
					stockData[message.author.id].balance[quotes.price.currency] = {
						amount: amount * price,
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
				.setTitle("You succesfully sold " + amount + " " + args[3] + " shares at " + price + quotes.price.currencySymbol + " each.");
		
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