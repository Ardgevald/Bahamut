module.exports = {
  args: true,
  name: 'roll',
  description: 'roll dices',
  usage: '<x>d<y> where <x> is the number of dices and <y> is the number of faces',
  execute(message, args) {
    message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
  },
};
