const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

readline.on('line', (line) => {
  const result = solution(parseInput(line));
  console.log(result);
  process.exit(0);
});

function parseInput(input) {
  return input.trim().split(' ').map(Number);
}

function solution([a, b, year]) {
  return Math.max(a, b) > 12 || a === b ? 1 : 0;
}
