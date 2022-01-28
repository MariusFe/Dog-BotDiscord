const discord = require('discord.js');
const fs = require('fs');
const request = require('request');
const config = require('./config.json');
require('dotenv').config();

const {Intents, Client} = require('discord.js');
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_TYPING"
    ],
    partials: [
        "CHANNEL",
    ]
});

//Using a folder to store all the commands
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}


client.once('ready', () =>{
    console.log('Bot online !');
})



client.on('message', message=>{



	if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    //Split the command into a list
    const args = message.content.substring(config.prefix.length).split(/ +/);


    if(message.channel.type == 'DM'){
        console.log('Server : DM | Username: ' + message.author.username + ' | Command: ' + message.content);
    }else{
        console.log('Server : ' + message.channel.guild.name + ' | Username: ' + message.author.username + ' | Command: ' + message.content);
    }


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

        case 'sncf':
            client.commands.get('sncf').execute(message, args, client);
        break;

        case 'bet':
            if(Number.isInteger(parseInt(args[2]))){
                if(!args[3] || args[3] == "all"){
                    client.commands.get('bet').execute(message, args, client);
                }
                else{client.commands.get('invalidCommand').execute(message, args, client);}
            }
            else if(args[2] == "start"){client.commands.get('betStart').execute(message, args, client);}
            else if(args[2] == "balance" || args[2] == "bal"){client.commands.get('balance').execute(message, args, client);}
            else if(args[2] == "stats"){client.commands.get('betStats').execute(message, args, client);}
            else if(args[2] == "give"){client.commands.get('betGive').execute(message, args, client);}
            else{client.commands.get('invalidCommand').execute(message, args, client);}
            break;

        case 'price':
            if(args.length > 3){
                client.commands.get('invalidCommand').execute(message, args, client);
            }
            else{
                client.commands.get('price').execute(message, args, client);
            }
            break;

        case 'stock':
            if(args[2] == "start"){client.commands.get('stockStart').execute(message, args, client);}
            else if(args[2] == "buy"){
                if(args[5]){client.commands.get('invalidCommand').execute(message, args, client);}
                else{client.commands.get('stockBuy').execute(message, args, client);}
            }
            else if(args[2] == "sell"){
                if(args[5]){client.commands.get('invalidCommand').execute(message, args, client);}
                else{client.commands.get('stockSell').execute(message, args, client);}
            }
            else if(args[2] == "help"){
                if(args[3]){client.commands.get('invalidCommand').execute(message, args, client);}
                else{client.commands.get('stockHelp').execute(message, args, client);}
            }

            else if(args[2] == "bal" || args[2] == "balance"){
                if(args[3]){client.commands.get('invalidCommand').execute(message, args, client);}
                else{client.commands.get('stockBalance').execute(message, args, client);}
            }

            else {client.commands.get('invalidCommand').execute(message, args, client);}

            break;

        case 'chie':
            message.channel.send(":poop:");

            break;

        case 'sex':

            if(!args[2]){
                client.commands.get('sex').execute(message, args, client); //Introduction message
            }
            else if(args[2] == "start"){
                if(args[3]){client.commands.get('invalidCommand').execute(message, args, client);}
                else{client.commands.get('sexStart').execute(message, args, client);}
            }
            else if(args[2] == "help"){
                if(args[3]){client.commands.get('invalidCommand').execute(message, args, client);}
                else{client.commands.get('sexHelp').execute(message, args, client);}
            }
            else if (args[2] == "claim"){
                if(args[3] == "soul"){
                    if(args[4]){client.commands.get('invalidCommand').execute(message, args, client);}
                    else{client.commands.get('sexClaimSoul').execute(message, args, client);}
                }
                else{client.commands.get('sexClaim').execute(message, args, client);}
            }
            else if (args[2] == "profile"){
                if(args[3]){client.commands.get('invalidCommand').execute(message, args, client);}
                else{client.commands.get('sexProfile').execute(message, args, client);}
            }
            else if (args[2] == "buy"){
                client.commands.get('sexBuy').execute(message, args, client);
            }
            else {client.commands.get('invalidCommand').execute(message, args, client);}

            break;




        /*case 'fish':

            if(!args[2]){
                client.commands.get('fish').execute(message, args, client);
            }
            else if(args[2] == "start"){
                if(args[3]){client.commands.get('invalidCommand').execute(message, args, client);}
                else{client.commands.get('fishStart').execute(message, args, client);}
            }
            else if(args[2] == "help"){
                if(args[3]){client.commands.get('invalidCommand').execute(message, args, client);}
                else{client.commands.get('fishHelp').execute(message, args, client);}
            }
            else {client.commands.get('invalidCommand').execute(message, args, client);}

            break;*/

        /*case 'role': 
            client.commands.get('roleUser').execute(message, args, client, numberOfRole); 
            numberOfRole++;
        break;*/

    	default:
    		client.commands.get('invalidCommand').execute(message, args, client);
    }

})




client.on('messageReactionAdd',(reaction, user) => {})



//Used to connect the bot, the token is stored in Heroku
client.login(process.env.TOKEN);