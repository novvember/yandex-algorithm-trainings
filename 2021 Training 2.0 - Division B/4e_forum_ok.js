const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const result = parseInput(input);
    console.log(result);
    process.exit(0);
  });

function parseInput(input) {
  const messages = [];

  for (let i = 1; i < input.length; i++) {
    if (input[i] === '0') {
      messages.push({
        id: input[i],
        theme: input[i + 1],
        msg: input[i + 2],
      });
      i += 2;
    } else {
      const id = Number(input[i]);
      messages.push({
        id: id,
        theme: messages[id - 1].theme,
        msg: input[i + 1],
      });
      i++;
    }
  }

  const map = {};

  for (let msg of messages) {
    if (!map[msg.theme]) map[msg.theme] = 0;
    map[msg.theme]++;
  }

  let max = 0;
  let maxTheme = '';

  for (let theme in map) {
    if (map[theme] > max) {
      max = map[theme];
      maxTheme = theme;
    }
  }

  return maxTheme;
}
