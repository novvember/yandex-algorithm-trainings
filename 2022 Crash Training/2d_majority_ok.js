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
  input = input.map((line) => line.split(' '));
  const nums = input[1].map(Number);
  return nums;
}

function solution(nums) {
  const limit = nums.length / 2;
  const map = {};

  function addToMap(num) {
    if (!map[num]) map[num] = 0;
    map[num]++;
  }

  for (let num of nums) {
    addToMap(num);
    if (map[num] > limit) return num;
  }

  return false;
}