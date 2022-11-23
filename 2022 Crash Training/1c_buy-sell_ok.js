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
  const daysNumber = +input[0];
  const prices = input[1].split(' ').map(Number);
  return [daysNumber, prices];
}

function solution([daysNumber, prices]) {
  const BAD_REQUEST = '0 0';
  if (prices.length < 2) return BAD_REQUEST;

  const mins = [0];
  const maxs = [0];
  let isAscending = true;

  for (let i = 1; i < prices.length; i++) {
    if (isAscending && prices[i] < prices[i - 1]) {
      maxs.push(i - 1);
      isAscending = false;
    } else if (!isAscending && prices[i] > prices[i - 1]) {
      mins.push(i - 1);
      isAscending = true;
    }
  }

  mins.push(prices.length - 1);
  maxs.push(prices.length - 1);

  // console.log(mins);
  // console.log(maxs);

  let maxDiff = 1;
  let minDay;
  let maxDay;

  for (let min of mins) {
    for (let max of maxs) {
      if (max <= min) continue;
      if (prices[max] / prices[min] > maxDiff) {
        maxDiff = prices[max] / prices[min];
        minDay = min;
        maxDay = max;
      }
    }
  }

  if (maxDiff === 1) return BAD_REQUEST;

  return [minDay + 1, maxDay + 1].join(' ');
}