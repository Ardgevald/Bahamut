const fs = require('fs');
const { token, prefix } = require('./config');

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

fs.readdirSync('./commands').forEach((file) => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    return;
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});


// Log our bot in
client.login(token);
