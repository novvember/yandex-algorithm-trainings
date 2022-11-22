const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

readline.on('line', (line) => {
  const result = solution(parseInput(line));
  console.log(result);
  process.exit(0);
});

function parseInput(input) {
  return input.trim().split(' ').map(Number);
}

function solution(numbers) {
  const set = new Set();
  const output = [];

  for (let number of numbers) {
    if (set.has(number)) output.push('YES');
    else output.push('NO');

    set.add(number);
  }

  return output.join('\n');
}
