const weather =  require('weather-js');
const discord = require('discord.js');
const {token,prefix} = require('../config.json');

module.exports = {
	name: 'weather',
	description: "Show the weather forecast in Angers, France",
	usage: "!dog weather",
	execute(message, args, client){

		weather.find({search: args[2], degreeType: 'C'}, function(error, result){
			if(error) return console.log(error);

			console.log(result.length);
			console.log(error);

			if(result.length == 0){
				const embed = new discord.MessageEmbed()
    			.setColor('#FF0000')
    			.setTitle('<:wut:760160064572358696> Error')
    			.setDescription('Wrong location');

    			message.channel.send({ embeds: [embed] });
    			return;
			}

			var current = result[0].current;
			var location = result[0].location;
			var forecast = result[0].forecast;
			var precipitation;

			const weatherinfo = new Discord.MessageEmbed();
			weatherinfo.setColor('#3368FF');

			if(!args[3] || args[3] == 'current'){
				weatherinfo.setDescription(current.skytext);
				weatherinfo.setAuthor(`Current weather for ${current.observationpoint}`);
				weatherinfo.setThumbnail(current.imageUrl);
				weatherinfo.addField('Temperature',`${current.temperature}°C`,true);
				weatherinfo.addField('Wind',`${current.winddisplay}`,true);
				weatherinfo.addField('Feels like',`${current.feelslike}°C`,true);
				weatherinfo.addField('Humidity',`${current.humidity}%`,true);
			}else if(args[3] == 'today'){
				precipitation = parseInt(forecast[1].precip);
				weatherinfo.setDescription(forecast[1].skytextday);
				weatherinfo.setAuthor(`Weather forecast for today ${forecast[1].date} at ${current.observationpoint}`);
				weatherinfo.addField('T°C min',`${forecast[1].low}°C`,true);
				weatherinfo.addField('T°C max',`${forecast[1].high}°C`,true);
				weatherinfo.addField('Precip.',`${precipitation}%`,true);
			}else if(args[3] == 'tomorrow'){
				precipitation = parseInt(forecast[2].precip);
				weatherinfo.setDescription(forecast[2].skytextday);
				weatherinfo.setAuthor(`Weather forecast for tomorrow ${forecast[2].date} at ${current.observationpoint}`);
				weatherinfo.addField('T°C min',`${forecast[2].low}°C`,true);
				weatherinfo.addField('T°C max',`${forecast[2].high}°C`,true);
				weatherinfo.addField('Precip.',`${precipitation}%`,true);
			} else if(args[3] == 'yesterday'){
				precipitation = parseInt(forecast[0].precip);
				weatherinfo.setDescription(forecast[0].skytextday);
				weatherinfo.setAuthor(`Weather forecast for yesterday ${forecast[0].date} at ${current.observationpoint}`);
				weatherinfo.addField('T°C min',`${forecast[0].low}°C`,true);
				weatherinfo.addField('T°C max',`${forecast[0].high}°C`,true);
				weatherinfo.addField('Precip.',`${precipitation}%`,true);
			}else{
				const oops = new discord.MessageEmbed()
    			.setColor('#FF0000')
    			.setTitle('<:wut:698139865480429662> Invalid Command')
    			.setDescription('Are you sure you are using the correct command ? Type `!dog help` to show all the commands');

    			message.channel.send({ embeds: [oops] });
    			return;
			}

			message.channel.send({ embeds: [weatherinfo] });

			return;
		})
	}
}