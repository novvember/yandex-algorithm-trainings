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

const test1 = solution([100, 5, 6]);
console.log(test1, test1 === 0);

const test2 = solution([10, 1, 9]);
console.log(test2, test2 === 1);

const test3 = solution([2, 1, 2]);
console.log(test3, test3 === 0);

const test4 = solution([10, 10, 1]);
console.log(test4, test4 === 0);
