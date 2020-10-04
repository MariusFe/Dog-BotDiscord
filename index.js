const discord = require('discord.js');
const fs = require('fs');
const request = require('request');
const config = require('./config.json');

const client = new discord.Client();

//Using a file to store all the commands
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

//Calling the userDataPet file
//var userDataPet = JSON.parse(fs.readFileSync('./data/userDataPet.JSON'))

//var numberOfRole;


client.once('ready', () =>{
    console.log('Bot online !');
    numberOfRole = 0;

    /*let roleJSON = require("./data/roleData.json");
    roleJSON = {};

    fs.writeFile("./data/roleData.json", JSON.stringify(roleJSON), (err) => {
        if(err) console.log(err)
    });*/
})

client.on('message', message=>{
    
    /*if(message.author.bot && message.embeds){
        const embed = message.embeds.find(msg => msg.title === ':white_check_mark:  Chose your role !')
        if(embed){
            let roleJSON = require("./data/roleData.json");
            var i = 0;
            for(var _roles in roleJSON[parseInt(embed.footer.text)].roles){
                if(i == 0){message.react('1️⃣');}
                if(i == 1){message.react('2️⃣');}
                if(i == 2){message.react('3️⃣');}
                if(i == 3){message.react('4️⃣');}
                if(i == 4){message.react('5️⃣');}
                if(i == 5){message.react('6️⃣');}
                if(i == 6){message.react('7️⃣');}
                if(i == 7){message.react('8️⃣');}
                if(i == 8){message.react('9️⃣');}
                if(i == 9){message.react('🔟');}
                i++;
            }
        }
    }*/

	if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.substring(config.prefix.length).split(/ +/);

    switch(args[1]){
    	case 'help': 
            if(args[2] == ''){
                client.commands.get('help').execute(message, args, client);
            } else{invalidCommand(message);}
            break;

		
		case 'pet':
    		if(!args[2]){
    			client.commands.get('pet').execute(message, args, client);
    		}
    		else if(args[2] == 'count'){ //Nombre de petting sur le server
    			if(!args[3]){
    				client.commands.get('count').execute(message, args, client);
    			} else{ invalidCommand(message);}
    		} 

    		/*else if(args[2] == 'top'){ //Classement du server + classement de l'utilisateur qui demande
    			if(!args[3]){
    				client.commands.get('top').execute(message, args, client);
    			} else if(args[3] == 'total'){ //Classement worlwide
    				client.commands.get('top_total').execute(message, args, client);
    			} else { invalidCommand(message);}
    		} */
            else {invalidCommand(message);}

    	break;
        case 'invite': client.commands.get('invite').execute(message, args, client); break;

        case 'weather': client.commands.get('weather').execute(message, args, client); break;

        case 'role': 
            client.commands.get('roleUser').execute(message, args, client, numberOfRole); 
            numberOfRole++;
        break;

    	default:
    		invalidCommand(message);
    }

    })

client.on('messageReactionAdd',(reaction, user) => {

    /*var member = reaction.message.guild.members.find(member => member.id === user.id);
    var role;
    var roleNumber;

    if(reaction.message.author.bot && reaction.message.embeds){
        const embed = reaction.message.embeds.find(msg => msg.title === ':white_check_mark:  Chose your role !')
        if(embed){
            let roleJSON = require("./data/roleData.json");
            for (var i in roleJSON[parseInt(embed.footer.text)].roles){
            }

            if(reaction.emoji.name == '1️⃣'){ roleNumber = 0;}
            if(reaction.emoji.name == '2️⃣'){ roleNumber = 1;}
            if(reaction.emoji.name == '3️⃣'){ roleNumber = 2;}
            if(reaction.emoji.name == '4️⃣'){ roleNumber = 3;}
            if(reaction.emoji.name == '5️⃣'){ roleNumber = 4;}
            if(reaction.emoji.name == '6️⃣'){ roleNumber = 5;}
            if(reaction.emoji.name == '7️⃣'){ roleNumber = 6;}
            if(reaction.emoji.name == '8️⃣'){ roleNumber = 7;}
            if(reaction.emoji.name == '9️⃣'){ roleNumber = 8;}
            if(reaction.emoji.name == '🔟'){ roleNumber = 9;}



            roleName = roleJSON[parseInt(embed.footer.text)].roles[roleNumber];
            try{ 
                role = reaction.message.guild.members.find(role => role.name.toLowerCase() === roleName.toLowerCase()); 
            } catch (error) {
                console.error(error);}
            member.addRole(role.id);
        }
    }*/
})









function invalidCommand(message){

    const embed = new discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('<:wut:698139865480429662> Invalid Command')
    .setDescription('Are you sure you are using the correct command ? Type `!dog help` to show all the commands');

    message.channel.send(embed);
}

client.login(process.env.TOKEN);