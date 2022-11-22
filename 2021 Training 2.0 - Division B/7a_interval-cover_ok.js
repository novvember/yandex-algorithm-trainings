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
  const count = +input[0].trim();
  const lines = [];
  for (let i = 1; i <= count; i++) {
    const line = input[i].trim().split(' ').map(Number);
    lines.push(line);
  }
  return lines;
}

function solution(lines) {
  const events = [];

  for (let [start, end] of lines) {
    const startEvent = {
      x: start,
      type: 'start',
      priority: -1,
    };
    const endEvent = {
      x: end,
      type: 'end',
      priority: 1,
    };
    events.push(startEvent, endEvent);
  }

  events.sort((a, b) => a.x - b.x || a.priority - b.priority);

  let count = 0;
  let prevStart = null;
  let length = 0;

  for (let event of events) {
    if (event.type === 'start') {
      if (count === 0) prevStart = event.x;
      count++;
    } else if (event.type === 'end') {
      count--;
      if (count === 0) {
        length += event.x - prevStart;
        prevStart = null;
      }
    }
  }

  return length;
}
