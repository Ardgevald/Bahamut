module.exports = {
  name: 'server',
  description: 'server info',
  execute(message, args) {
    message.channel.send(`This server's name is: ${message.guild.name}`);
  },
};
