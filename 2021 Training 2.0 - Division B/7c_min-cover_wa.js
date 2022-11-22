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
  const m = +input[0].trim();
  const lines = [];
  for (let i = 1; i < input.length; i++) {
    const line = input[i].trim().split(' ').map(Number);
    if (line[0] === 0 && line[1] === 0) break;
    lines.push(line);
  }
  return [m, lines];
}

function solution([m, lines]) {
  lines = lines
    .filter((line) => line[0] < m && line[1] > 0)
    .sort((a, b) => a[0] - b[0]);

  const answer = [];
  let xCurrent = 0;
  let xNext = xCurrent;
  let currentLine = [0, 0];

  for (let [left, right] of lines) {
    if (left > xCurrent) {
      answer.push(currentLine);
      xCurrent = xNext;
      if (xCurrent >= m) break;
    }

    if (left <= xCurrent && right > xNext) {
      xNext = right;
      currentLine = [left, right];
    }
  }

  if (xCurrent < m) {
    answer.push(currentLine);
    xCurrent = xNext;
  }

  if (xCurrent < m) return 'No solution';

  return answer.length + '\n' + answer.map((line) => line.join(' ')).join('\n');
}
