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
  const target = input[0].trim();
  const files = [];

  for (let i = 2; i < input.length; i++) {
    files.push(input[i]);
  }

  return [target, files];
}

function solution([target, files]) {
  const targetIndex = files.findIndex((line) => line.trim() === target);

  const stack = [target];
  let levelCount = files[targetIndex].length - files[targetIndex].trim().length;
  let i = targetIndex;

  while (levelCount) {
    while (
      files[i].includes('.') ||
      files[i].startsWith(' '.repeat(levelCount))
    ) {
      i--;
    }
    stack.push(files[i].trim());
    levelCount--;
  }

  return '/' + stack.reverse().join('/');
}