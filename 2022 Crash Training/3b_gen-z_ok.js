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
    const result = solution(parseInput(input));
    console.log(result);
    process.exit(0);
  });

function parseInput(input) {
  return input[1].split(' ').map(Number);
}

function solution(nums) {
  nums.sort((a, b) => a - b);

  let invitationCount = 0;
  let yMin = 0;
  let yMax = 0;

  for (let x = 0; x < nums.length; x++) {
    while (yMin < nums.length && nums[yMin] <= 0.5 * nums[x] + 7) {
      yMin++;
    }

    while (yMax < nums.length && nums[yMax] <= nums[x]) {
      yMax++;
    }

    if (yMin < yMax) invitationCount += yMax - yMin - 1;
  }

  return invitationCount;
}