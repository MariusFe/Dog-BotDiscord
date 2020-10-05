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


client.once('ready', () =>{
    console.log('Bot online !');
    numberOfRole = 0;
})

client.on('message', message=>{

	if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.substring(config.prefix.length).split(/ +/);

    switch(args[1]){
    	case 'help': 
            if(!args[3]){
                client.commands.get('help').execute(message, args, client);
            } else{client.commands.get('invalidCommand').execute(message, args, client);}
            break;

		
		case 'pet':
    		if(!args[2]){
    			client.commands.get('pet').execute(message, args, client);
    		}
    		else if(args[2] == 'count'){ //Nombre de petting sur le server
    			if(!args[3]){
    				client.commands.get('count').execute(message, args, client);
    			} else{ client.commands.get('invalidCommand').execute(message, args, client);}
    		} 

            else {client.commands.get('invalidCommand').execute(message, args, client);}

    	break;
        case 'invite': client.commands.get('invite').execute(message, args, client); break;

        case 'weather': client.commands.get('weather').execute(message, args, client); break;

        case 'role': 
            client.commands.get('roleUser').execute(message, args, client, numberOfRole); 
            numberOfRole++;
        break;

    	default:
    		client.commands.get('invalidCommand').execute(message, args, client);
    }

    })

client.on('messageReactionAdd',(reaction, user) => {})


client.login(process.env.TOKEN);