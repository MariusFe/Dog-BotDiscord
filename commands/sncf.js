const discord = require('discord.js');
const {token,prefix} = require('../config.json');
const request = require('request');


module.exports = {
	name: 'sncf',
	description: "Api SNCF test",
	usage: "!dog sncf",
	execute(message,args,client){
		request('https://api.sncf.com/v1/coverage/sncf/commercial_modes?username=14017e46-0fe9-4a3d-a412-4f215b4d89e7', { json: true}, (err, res, body) => {
			if (err) { return console.log(err); }
			console.log(body);
		});
	}
}