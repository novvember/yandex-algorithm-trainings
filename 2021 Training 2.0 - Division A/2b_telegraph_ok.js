const { join } = require('path');

const _readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const lines = [];

_readline
  .on('line', (line) => {
    lines.push(line);
  })
  .on('close', () => {
    let x = lines[0].trim().split('').reverse().join('');
    const z = lines[1].trim().split('').reverse().join('');

    x = x.repeat(Math.ceil(z.length / x.length));

    const y = [];
    let i = 0;

    while (i < z.length) {
      const rest = z.slice(i);
      if (x.indexOf(rest) === 0) {
        break;
      }
      y.push(z[i]);
      i++;
    }

    console.log(y.join('').split('').reverse().join(''));
  });
