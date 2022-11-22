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

function solution(numbers) {
  let max = 0;
  let count = 0;

  for (let number of numbers) {
    if (number === max) {
      count++;
    } else if (number > max) {
      max = number;
      count = 1;
    }

    if (number === 0) break;
  }

  return count;
}

const test1 = solution([1, 7, 9, 0]);
console.log(test1, test1 === 1);

const test2 = solution([1, 3, 3, 1, 0]);
console.log(test2, test2 === 2);
