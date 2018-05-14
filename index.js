const { token } = require('./token');

// Import the discord.js module
const Discord = require('discord.js');

console.log();

// Create an instance of a Discord client
const client = new Discord.Client();

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

// Log our bot in
client.login(token);
