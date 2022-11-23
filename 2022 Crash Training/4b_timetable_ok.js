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
  const requests = [];

  for (let i = 1; i < input.length; i++) {
    requests.push(input[i].trim().split(' ').map(Number));
  }
  return requests;
}

function solution(requests) {
  requests.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let lastEnd = 0;

  for (let request of requests) {
    if (request[0] >= lastEnd) {
      lastEnd = request[1];
      count++;
    }
  }

  return count;
}