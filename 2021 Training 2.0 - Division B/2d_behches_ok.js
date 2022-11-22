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
