module.exports = {
  args: true,
  name: 'args-info',
  description: 'Information about the arguments provided.',
  execute(message, args) {
    if (args[0] === 'foo') {
      message.channel.send('bar');
      return;
    }

    message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
  },
};
