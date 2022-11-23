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
  const count = +input[0];
  const times = input[1].split(' ');
  return [count, times];
}

function solution([num, times]) {
  function getTime(timeString) {
    const [hours, mins] = timeString.split(':').map(Number);
    return mins + hours * 60;
  }

  times = times.map(getTime).sort((a, b) => a - b);
  times.push(24 * 60 + times[0]);
  let minDiff = times[times.length - 1] - times[0];

  for (let i = 1; i < times.length; i++) {
    const diff = times[i] - times[i - 1];
    if (diff < minDiff) {
      minDiff = diff;
    }
  }

  return minDiff;
}