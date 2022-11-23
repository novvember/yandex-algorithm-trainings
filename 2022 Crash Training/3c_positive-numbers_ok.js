const input = [];

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const [nums, queries] = parseInput(input);
    const map = countPositive(nums);

    for (let i = 0; i < queries.length; i++) {
      console.log( solution(map, queries[i]) );
    }

    process.exit(0);
  });

function parseInput(input) {
  const nums = input[1].split(' ').map(Number);
  const count = +input[2];
  const queries = [];
  for (let i = 3; i < 3 + count; i++) {
    queries.push(input[i].split(' ').map(Number));
  }
  return [nums, queries];
}

function countPositive(nums) {
  const map = new Array(nums.length + 1).fill(0);

  for (let i = 0; i < nums.length; i++) {
    map[i + 1] = map[i];
    if (nums[i] > 0) map[i + 1]++;
  }

  return map;
}

function solution(map, [l, r]) {
  l = l - 1;
  return map[r] - map[l];
}