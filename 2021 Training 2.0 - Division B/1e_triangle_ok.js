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
  const d = Number(input[0].trim());
  const [x, y] = input[1].trim().split(' ').map(Number);
  return [d, x, y];
}

function solution([d, x, y]) {
  const getDistanse = ([x1, y1], [x2, y2]) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  if (x >= 0 && y >= 0 && y <= d - x) return 0;
  const distanses = [
    [0, 0],
    [d, 0],
    [0, d],
  ].map((coords) => getDistanse(coords, [x, y]));
  return distanses.indexOf(Math.min(...distanses)) + 1;
}

const test1 = solution([5, 1, 1]);
console.log(test1, test1 === 0);

const test2 = solution([3, -1, -1]);
console.log(test2, test2 === 1);

const test3 = solution([4, 4, 4]);
console.log(test3, test3 === 2);

const test4 = solution([4, 2, 2]);
console.log(test4, test4 === 0);
