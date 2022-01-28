const discord = require('discord.js');
const {token,prefix} = require('../config.json');
let sexData = require("../data/sexUserData.json");
const sexDataServer = require("../data/sexServerData.json");
const fs = require('fs');

module.exports = {
	name: 'sexBuy',
	description: "Buy adds",
	usage: prefix + "sex buy amount max",
	execute(message,args,client){

		if(!sexData[message.author.id]){
			invalidCommand(message, 'You did not start the game yet to receive your first bonus yet: `'+prefix+' sex start`.\nYou can also check the help page about the game: `'+prefix+' sex help`.');
			return;
		}

		const addsArray =[];

		for(const add in sexData[message.author.id].adds){
			addsArray.push(add);
		}

		if (!addsArray.includes(args[3])){
			invalidCommand(message, 'This add does not exist.');
			return;
		}

		if(isNaN(parseInt(args[4]))){
			if(args[4] != "max"){
				invalidCommand(message, "This amount is not available.")
				return;
			}
		}

		if(!isNaN(parseInt(args[4]))){
			const totalCost = (parseInt(args[4]) + 1 ) * sexDataServer.adds[args[3]].price * (Math.pow(21/20,sexData[message.author.id].adds[args[3]]) + Math.pow(21/20,parseInt(args[4]) + sexData[message.author.id].adds[args[3]])) / 2 - sexDataServer.adds[args[3]].price * Math.pow(21/20,sexData[message.author.id].adds[args[3]]);
			if(Math.round(totalCost) > sexData[message.author.id].bonPoint){
				invalidCommand(message, 'You don\'t have enough in your balance to buy this amount of add.\n<:bonpoint:927435531321753651> You need `'+Math.round(totalCost).toLocaleString()+'` bons points.');
				return;
			} else{
				sexData[message.author.id].bonPoint -= Math.round(totalCost);
				sexData[message.author.id].bonPoint = Math.round(sexData[message.author.id].bonPoint);
				sexData[message.author.id].adds[args[3]] += parseInt(args[4]);
				sexData[message.author.id].everSpent += Math.round(totalCost);

				pricePerUnit = sexDataServer.adds[args[3]].price * Math.pow(21/20,sexData[message.author.id].adds[args[3]]+1);

				 const embed = new discord.MessageEmbed()
    			.setColor('#3368FF')
    			.setThumbnail('http://www.polytech-angers.fr/_resource/Pages_Bandeau_Illustration/Illustration_sagi.jpg')
    			.setTitle(message.author.username +" - You succesfully buy your adds")
    			.addField('You bought `' + args[4] +"` "+ sexDataServer.adds[args[3]].desc + " " + sexDataServer.adds[args[3]].emote, 'For a total cost of `'+Math.round(totalCost).toLocaleString()+'` bons points')
    			.addField('<:bonpoint:927435531321753651> You now have `' + sexData[message.author.id].bonPoint.toLocaleString() + '` bonPoint in your balance','Next '+sexDataServer.adds[args[3]].desc+' is at `'+Math.round(pricePerUnit).toLocaleString()+'` bons points');

    			message.channel.send({ embeds: [embed] });
			}
		}
		else{
			invalidCommand(message, 'Not implemented yet');
		}

		fs.writeFile("./data/sexUserData.json", JSON.stringify(sexData), (err) => {
			if(err) console.log(err)
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