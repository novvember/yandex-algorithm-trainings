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
  const [_, socksCount, checksCount] = input[0].trim().split(' ').map(Number);
  const socks = [];
  const checks = [];
  for (let i = 0; i < socksCount; i++) {
    socks.push(input[1 + i].trim().split(' ').map(Number));
  }
  for (let i = 0; i < checksCount; i++) {
    checks.push(+input[1 + socksCount + i]);
  }

  return [socks, checks];
}

function solution([socks, checks]) {
  const events = [];

  for (let sock of socks) {
    events.push({ x: sock[0], priority: 10, type: 'sock-start' });
    events.push({ x: sock[1], priority: 30, type: 'sock-end' });
  }

  for (let check of checks) {
    events.push({ x: check, priority: 20, type: 'check' });
  }

  events.sort((a, b) => {
    if (a.x === b.x) return a.priority - b.priority;
    return a.x - b.x;
  });

  const checkValues = {};
  let count = 0;

  for (let event of events) {
    if (event.type === 'sock-start') {
      count++;
    } else if (event.type === 'sock-end') {
      count--;
    } else if (event.type === 'check') {
      checkValues[event.x] = count;
    }
  }

  const answers = [];
  for (let check of checks) {
    answers.push(checkValues[check]);
  }

  return answers.join('\n');
}