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
  const folders = input[1].trim().split(' ').map(Number);
  return folders;
}

function solution(folders) {
  const sorted = folders.sort((a, b) => a - b);
  const max = sorted[sorted.length - 1];
  return sorted.reduce((sum, value) => sum + value, 0) - max;
}

const test1 = solution([2, 1]);
console.log(test1, test1 === 1);
