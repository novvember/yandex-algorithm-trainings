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

const test1 = solution('a');
console.log(test1, test1 === 0);

const test2 = solution('ab');
console.log(test2, test2 === 1);

const test3 = solution('cognitive');
console.log(test3, test3 === 4);
