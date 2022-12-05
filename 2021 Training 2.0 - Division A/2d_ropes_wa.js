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
    const ropes = lines[1].trim().split(/\s+/g).map(Number);

    let sum = 0;
    let max = 0;

    for (let rope of ropes) {
      sum += rope;
      max = Math.max(max, rope);
    }

    const answer = max > sum / 2 ? 2 * max - sum : max * 2;

    console.log(answer);
  });
