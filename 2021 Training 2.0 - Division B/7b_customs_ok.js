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
  const items = [];
  for (let i = 1; i <= count; i++) {
    const item = input[i].trim().split(' ').map(Number);
    items.push(item);
  }
  return items;
}

function solution(items) {
  const events = [];

  for (let [start, duration] of items) {
    const startEvent = {
      time: start,
      type: 'start',
      priority: 1,
    };
    const endEvent = {
      time: start + duration,
      type: 'end',
      priority: -1,
    };
    events.push(startEvent, endEvent);
  }

  events.sort((a, b) => a.time - b.time || a.priority - b.priority);

  let count = 0;
  let maxCount = count;

  for (let event of events) {
    if (event.type === 'start') {
      count++;
    } else if (event.type === 'end') {
      count--;
    }
    maxCount = Math.max(count, maxCount);
  }

  return maxCount;
}
