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

function solution([count, start, finish]) {
  [start, finish] = [start, finish].sort((a, b) => a - b);
  return Math.min(finish - start - 1, count + start - finish - 1);
}
