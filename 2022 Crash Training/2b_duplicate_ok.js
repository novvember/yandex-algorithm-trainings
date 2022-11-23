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
  const k = Number(input[0][1]);
  const nums = input[1].map(Number);
  return [nums, k];
}

function solution([nums, k]) {
  const map = {};

  function add(num, pos) {
    if (!map[num]) map[num] = [];
    map[num].push(pos);
  }

  function checkDistance(positions) {
    for (let i = 1; i < positions.length; i++) {
      if (positions[i] - positions[i - 1] <= k) return true;
    }
    return false;
  }

  for (let i = 0; i < nums.length; i++) {
    add(nums[i], i);
  }

  for (let num in map) {
    if (map[num].length > 1 && checkDistance(map[num])) return 'YES';
  }

  return 'NO';
}