function getRandomInt(minimum, maximum) {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);

  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

const usage = `[<x>]d<y>[<r><z>][<s><w>] where :
[<x>] (facultative) is the number of dices to roll and is 1 by default
<y> is the number of faces of the dice
[<r><z>] (facultative) let you multiply or divide the final result by a number, <r> being one of the two symbols '/' or 'x' and <z> the value
[<s><w>] (facultative) let you add or substract a value to the result by a number, <s> being one of the two symbols '+' or '-' and <w> the value

these operations must be in order

example : 
  !roll 3d6 x 3 + 1

it will roll 3 times a 6 faced dice, multiply the result by 3 and add 1`;

module.exports = {
  args: true,
  name: 'roll',
  aliases: ['r'],
  description: 'roll dices',
  usage,
  execute(message, args) {
    const re = /^([1-9]\d*)?d([1-9]\d*)([/x][1-9]\d*)?([+-]\d+)?$/;
    const roll = re.exec(args.join(''));

    if (!roll) {
      message.channel.send(`Cannot parse roll\`\`\`\n${usage}\`\`\``);
      return;
    }

    const amount = roll[1] || 1;
    const dice = roll[2] || 1;
    let messageMult = '';
    let add = 0;
    let mult = 1;


    // Multiplication or division
    if (roll[3]) {
      const symbolMult = roll[3][0];
      mult = Number.parseInt(roll[3].slice(1), 10);

      if (mult !== 1) {
        if (symbolMult === '/') {
          if (mult === 0) {
            throw Error('Division by 0');
          }
          messageMult = ` divided by ${mult}`;
          mult = 1 / mult;
        } else {
          messageMult = ` multiplied by ${mult}`;
        }
      }
    }

    let messageAdd = '';

    // Addition or substraction
    if (roll[4]) {
      const symbolAdd = roll[4][0];
      messageAdd += ' to which we ';
      add = Number.parseInt(roll[4].slice(1), 10);

      if (add !== 0) {
        if (symbolAdd === '+') {
          messageAdd += `add ${add}`;
        } else {
          messageAdd += `remove ${add}`;
          add = -add;
        }
      }
    }

    const results = [];

    for (let i = 0; i < amount; i += 1) {
      results.push(getRandomInt(0, dice) + 1);
    }

    const finalResult = (results.reduce((prev, curr) => prev + curr) * mult) + add;

    message.channel.send(`Rolled ${amount} d${dice}${messageMult}${messageAdd} for a result of **${finalResult}**`);
    message.channel.send(`Rolls : \`${results.join(', ')}\``);
  },
};
