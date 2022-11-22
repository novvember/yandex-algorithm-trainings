// const readline = require('readline').createInterface(
//   process.stdin,
//   process.stdout,
// );

// readline.on('line', (line) => {
//   const result = solution(parseInput(line));
//   console.log(result);
//   process.exit(0);
// });

function parseInput(input) {
  return input.trim().split(' ').map(Number);
}

function solution([a, b, year]) {
  return Math.max(a, b) > 12 || a === b ? 1 : 0;
}

const test1 = solution([1, 2, 2003]);
console.log(test1, test1 === 0);

const test2 = solution([2, 29, 2008]);
console.log(test2, test2 === 1);

const test3 = solution([1, 1, 2008]);
console.log(test3, test3 === 0);

const test4 = solution([31, 10, 2008]);
console.log(test4, test4 === 1);

const test5 = solution([12, 31, 2008]);
console.log(test5, test5 === 1);

const test6 = solution([11, 31, 2008]);
console.log(test6, test6 === 1);

const test7 = solution([31, 10, 2008]);
console.log(test7, test7 === 1);

const test8 = solution([10, 10, 2008]);
console.log(test8, test8 === 0);

const test9 = solution([1, 1, 2008]);
console.log(test9, test9 === 0);
