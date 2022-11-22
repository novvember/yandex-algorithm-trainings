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
  const count = Number(input[2].trim());
  const queries = [];

  for (let i = 0; i < count; i++) {
    const query = input[i + 3].trim().split(' ').map(Number);
    queries.push(query);
  }

  return [nums, queries];
}

function solution([nums, queries]) {
  function findMinIndex(min) {
    let l = 0;
    let r = nums.length - 1;

    while (r - l > 0) {
      let m = Math.floor((l + r) / 2);

      if (nums[m] >= min) {
        r = m;
      } else {
        l = m + 1;
      }
    }

    return r;
  }

  function findMaxIndex(max) {
    let l = 0;
    let r = nums.length - 1;

    while (r - l > 0) {
      let m = Math.ceil((l + r) / 2);

      if (nums[m] > max) {
        r = m - 1;
      } else {
        l = m;
      }
    }

    return r;
  }

  nums.push(-Infinity);
  nums.push(Infinity);
  nums.sort((a, b) => a - b);

  const answers = [];

  for (let [min, max] of queries) {
    const minIndex = findMinIndex(min);
    const maxIndex = findMaxIndex(max);
    answers.push(maxIndex - minIndex + 1);
  }

  return answers.join(' ');
}