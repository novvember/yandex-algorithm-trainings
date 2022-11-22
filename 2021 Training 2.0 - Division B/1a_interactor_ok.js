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

const test1 = solution([0, 0, 0]);
console.log(test1, test1 === 0);

const test2 = solution([-1, 0, 1]);
console.log(test2, test2 === 3);

const test3 = solution([42, 1, 6]);
console.log(test3, test3 === 6);

const test4 = solution([44, 7, 4]);
console.log(test4, test4 === 1);

const test5 = solution([1, 4, 0]);
console.log(test5, test5 === 3);

const test6 = solution([-3, 2, 4]);
console.log(test6, test6 === 2);
