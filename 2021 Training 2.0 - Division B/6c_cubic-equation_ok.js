const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

readline
  .on('line', (line) => {
    const result = solution(parseInput(line));
    console.log(result);
  })
  .on('close', () => {
    process.exit(0);
  });

function parseInput(line) {
  return line.trim().split(' ').map(Number);
}

function solution([a, b, c, d]) {
  const countUp = (x) => a * x ** 3 + b * x ** 2 + c * x + d;
  const countDown = (x) => -countUp(x);
  let count = countUp;

  let l = -1000000;
  let r = 1000000;

  if (count(r) < 0) count = countDown;

  for (let i = 0; i < 100000; i++) {
    const m = (l + r) / 2;
    const result = count(m);
    if (result > 0) r = m;
    else l = m;
  }

  return l;
}
