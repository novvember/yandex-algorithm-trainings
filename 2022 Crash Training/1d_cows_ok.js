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
  const cows = input[0].split(' ').map(Number)[1];
  const bays = input[1].split(' ').map(Number);
  return [cows, bays];
}

function solution([cows, bays]) {
  function checkSetCows(minDist) {
    let lastFilled = bays[0];
    let left = cows - 1;
    for (let bay of bays) {
      if (bay >= lastFilled + minDist) {
        lastFilled = bay;
        left--;
      }
    }
    return left <= 0;
  }

  let left = 1;
  let right = 1e9 + 1;

  while (right - left > 1) {
    const mid = Math.floor((right + left) / 2);
    if (checkSetCows(mid)) {
      left = mid;
    } else {
      right = mid;
    }
  }

  return left;
}