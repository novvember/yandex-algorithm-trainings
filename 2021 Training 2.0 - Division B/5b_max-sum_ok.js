const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const input = [];
const prefixSums = [];

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
  const nums = input[1].trim().split(' ').map(Number);
  fillPrefixSums(nums);
  return prefixSums;
}

function fillPrefixSums(nums) {
  prefixSums[0] = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSums[i + 1] = prefixSums[i] + nums[i];
  }
}

function solution() {
  let min = prefixSums[0];
  let max = -Infinity;
  let prevMin = min;
  let prevMax = max;

  for (let i = 1; i < prefixSums.length; i++) {
    if (prefixSums[i] > max) {
      max = prefixSums[i];
    } 
    if (prefixSums[i] < min) {
      if (max - min > prevMax - prevMin) {
        prevMax = max;
        prevMin = min;
      }

      min = prefixSums[i];
      max = -Infinity;
    }
  }

  return Math.max(prevMax - prevMin, max - min);
}
