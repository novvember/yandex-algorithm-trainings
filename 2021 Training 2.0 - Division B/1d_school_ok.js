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
  return input[1].trim().split(' ').map(Number);
}

function solution(numbers) {
  return numbers[Math.floor(numbers.length / 2)];
}

const test1 = solution([1, 2, 3, 4]);
console.log(test1, test1 === 3);

const test2 = solution([-1, 0, 1]);
console.log(test2, test2 === 0);
