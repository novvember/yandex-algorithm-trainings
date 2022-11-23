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
    const result = solution(parseInput(input));
    console.log(result);
    process.exit(0);
  });

function parseInput(input) {
  return input.map(Number);
}

function solution([a, b, c, d]) {
  if (a === 0 && b === 0) return 'INF';
  else if (a === 0) return 'NO';

  const x = -b / a;
  if (x % 1 !== 0) return 'NO';

  if (d === 0 && x === 0) return 'NO';
  else if (x === -d / c) return 'NO';

  return x;
}
