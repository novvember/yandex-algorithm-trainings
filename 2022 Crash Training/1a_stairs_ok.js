const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

readline.on('line', (line) => {
  const result = solution(+line);
  console.log(result);
  process.exit(0);
});

function solution(n) {
  const x = (-1 + Math.sqrt(1 + 8 * n)) / 2;
  return Math.floor(x);
}
