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
  const length = input[0].trim().split(' ').map(Number)[0];
  const blocks = input[1].trim().split(' ').map(Number);
  return [length, blocks];
}

function solution([length, blocks]) {
  const center = Math.floor(length / 2);
  if (length % 2 !== 0 && blocks.includes(center)) return center.toString();

  let block1 = 0;
  let block2 = 0;

  for (let block of blocks) {
    if (block < center) {
      block1 = block;
    } else {
      block2 = block;
      break;
    }
  }

  return [block1, block2].join(' ');
}

const test1 = solution([5, [0, 2]]);
console.log(test1, test1 === '2');

const test2 = solution([13, [1, 4, 8, 11]]);
console.log(test2, test2 === '4 8');

const test3 = solution([14, [1, 6, 8, 11, 12, 13]]);
console.log(test3, test3 === '6 8');

const test4 = solution([14, [1, 2, 13]]);
console.log(test4, test4 === '2 13');
