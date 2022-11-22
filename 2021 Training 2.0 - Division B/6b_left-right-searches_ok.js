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
  const nums = input[1].trim().split(' ').map(Number);
  const queries = input[3].trim().split(' ').map(Number);
  return [nums, queries];
}

function solution([nums, queries]) {
  function findLeft(target, nums) {
    let l = 0;
    let r = nums.length - 1;

    while (l < r) {
      let m = Math.floor((l + r) / 2);

      if (nums[m] >= target) {
        r = m;
      } else {
        l = m + 1;
      }
    }

    return nums[l] === target ? l : -1;
  }

  function findRight(target, nums) {
    let l = 0;
    let r = nums.length - 1;

    while (l < r) {
      let m = Math.ceil((l + r) / 2);

      if (nums[m] <= target) {
        l = m;
      } else {
        r = m - 1;
      }
    }

    return nums[l] === target ? l : -1;
  }

  const answers = [];

  for (let query of queries) {
    let min = findLeft(query, nums);
    let max = findRight(query, nums);
    answers.push([min + 1, max + 1].join(' '));
  }

  return answers.join('\n');
}
