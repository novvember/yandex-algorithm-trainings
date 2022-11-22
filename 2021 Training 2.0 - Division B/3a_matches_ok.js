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
  const list1 = input[0].trim().split(' ').map(Number);
  const list2 = input[1].trim().split(' ').map(Number);
  return [list1, list2];
}

function solution([list1, list2]) {
  const set1 = new Set(list1);
  const set2 = new Set(list2);

  const commonNums = [...set1].filter((num) => set2.has(num));

  return commonNums.length;
}
