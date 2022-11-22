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
  const count = Number(input[0].trim());
  const boxes = [];

  for (let i = 1; i <= count; i++) {
    boxes.push(input[i].trim().split(' ').map(Number));
  }

  return boxes;
}

function solution(boxes) {
  const map = {};

  for (let box of boxes) {
    const [color, value] = box;
    if (map[color] === undefined) map[color] = 0;
    map[color] += value;
  }

  const nums = Object.keys(map).sort((a, b) => +a - +b);

  return nums.map((num) => num.toString() + ' ' + map[num]).join('\n');
}
