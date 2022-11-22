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
  return input.trim();
}

function solution(string) {
  let left = 0;
  let right = string.length - 1;
  let count = 0;

  while (left < right) {
    if (string[left++] !== string[right--]) count++;
  }

  return count;
}
