const discord = require('discord.js');
const {token,prefix} = require('../config.json');
let roleJSON = require("../data/roleData.json");
const fs = require('fs');

module.exports = {
	name: 'roleUser',
	description: "Add a role to whoever click on the numbers below. First create the roles on the server, then type the following command, for example: !dog role TD1 TD2, to chose between two roles. Then the bot will add some reactions under the message and the user just have to click on the role he wants. Warning: this command only works if the user can manage roles",
	usage: "!dog invite role1 role2 ...",
	execute(message,args,client,numberOfRole){

		if(message.guild == null){
			const embed = new discord.MessageEmbed()
    		.setColor('#FF0000')
    		.setTitle('<:wut:698139865480429662> Not in DM')
    		.setDescription('This command cannot work in DM (until now)');
    		message.channel.send(embed);

			return;
		}

		/*if(!message.member.role.hasPermissions('MANAGE_ROLES')){
			const embed = new discord.MessageEmbed()
			.setColor('#FF0000')
			.setTitle('<:wut:698139865480429662> You don\'t have the permission to do this command')
			.setDescription('Better ask an admin for any advice')
			message.channel.send(embed);

			return;
		}*/

		if(!args[2]){
			const embed = new discord.MessageEmbed()
			.setColor('#FF0000')
			.setTitle('<:wut:698139865480429662> You need to add some roles at the end of the command !')
			.setDescription('Better ask an admin for any advice')
			message.channel.send(embed);

			return;
		}


		//Creating JSON array to store informations, a bit like killing a fly with a bazooka but who cares, i do what i want
		//we need a key to store the info
		//this is only useful if the bot is used in many server at the same time as the data will be deleted when the reactions will be added
		var number;

		roleJSON[numberOfRole] = {
			roles: {}
		}


		const embed = new discord.MessageEmbed()
		.setColor('#3368FF')
		.setTitle(':white_check_mark:  Chose your role !')
		.setFooter(numberOfRole)

		var _description = 'Click on the corresponding reaction below this message to chose your role';

		var i = 0;
		for (var _arg in args){
			if(args[i].toLowerCase() === 'admin'){
				const embed = new discord.MessageEmbed()
				.setColor('#FF0000')
				.setTitle('<:wut:698139865480429662> You cannot manage the role Admin !')
				.setDescription('Better ask an admin for any advice, petit coquin va')
				message.channel.send(embed);

				return;
			}
			if(i>=2){
				_description = _description + `\n**${i-1}. ${args[i]}**`;
				roleJSON[numberOfRole].roles[i-2] = args[i];
			}
			i++;
			if(i>12){
				const embed = new discord.MessageEmbed()
				.setColor('#FF0000')
				.setTitle('<:wut:698139865480429662> You cannot manage more than 10 roles !')
				.setDescription('Better ask an admin for any advice')
				message.channel.send(embed);

				return;
			}
		}
		fs.writeFile("./data/roleData.json", JSON.stringify(roleJSON), (err) => {
			if(err) console.log(err)
		});

		embed.setDescription(_description);
		message.channel.send(embed);

		return;
	}
}