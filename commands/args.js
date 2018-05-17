module.exports = {
  args: true,
  name: 'args',
  aliases: ['args-info', 'argsinfo'],
  description: 'Information about the arguments provided.',
  usage: '!args <argument1> <argument2> ...',
  execute(message, args) {
    if (args[0] === 'foo') {
      message.channel.send('bar');
      return;
    }

    message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
  },
};
