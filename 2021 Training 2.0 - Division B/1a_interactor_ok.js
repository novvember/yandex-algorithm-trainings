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

function solution([res, i, c]) {
  switch (i) {
    case 0:
      if (res !== 0) return 3;
      else return c;
    case 1:
      return c;
    case 4:
      if (res !== 0) return 3;
      else return 4;
    case 6:
      return 0;
    case 7:
      return 1;
    default:
      return i;
  }
}