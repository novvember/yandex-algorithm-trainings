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
  const map = {};

  numbers.forEach((num) => {
    if (!map[num]) map[num] = 0;
    map[num]++;
  });

  return numbers.filter((num) => map[num] === 1).join(' ');
}
