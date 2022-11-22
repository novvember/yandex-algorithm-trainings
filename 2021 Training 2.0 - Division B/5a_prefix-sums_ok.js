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

  const queries = [];

  for (let i = 2; i < input.length; i++) {
    const query = input[i].trim().split(' ').map(Number);
    queries.push(query);
  }

  return queries;
}

function fillPrefixSums(nums) {
  prefixSums[0] = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSums[i + 1] = prefixSums[i] + nums[i];
  }
}

function solution(queries) {
  const answers = [];

  for (let query of queries) {
    const [l, r] = query;
    const answer = prefixSums[r] - prefixSums[l - 1];
    answers.push(answer);
  }

  return answers.join('\n');
}
