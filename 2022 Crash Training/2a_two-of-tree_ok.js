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
  input = input.map((line) => line.split(' '));
  const list1 = input[1].map(Number);
  const list2 = input[3].map(Number);
  const list3 = input[5].map(Number);
  return [list1, list2, list3];
}

function solution(lists) {
  const map = {};

  function addNum(list, num) {
    if (!map[num]) map[num] = new Set();
    map[num].add(list);
  }

  for (let list of lists) {
    for (let num of list) {
      addNum(list, num);
    }
  }

  const ans = [];

  for (let num in map) {
    if (map[num].size > 1) ans.push(+num);
  }

  return ans.sort((a, b) => a - b).join(' ');
}