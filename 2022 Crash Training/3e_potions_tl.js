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
  const count = input[0].split(' ').map(Number)[1];
  const values = input[1].split(' ').map(Number);
  return [count, values];
}

function solution([k, values]) {
  values.sort((a, b) => b - a);

  let done = 0;
  let count = 0;
  const singles = new Set();

  let i = 0;
  let next = 1;

  while (count < k) {
    let wasSingle = singles.has(i);
    const onlyMax = !wasSingle ? values[i] : -Infinity;

    const thisMax = values[i] + values[next];
    const nextMax = Math.max(values[i + 1] + values[i + 2], values[i + 1]);
    const max = Math.max(thisMax, onlyMax, nextMax);

    if (max === thisMax) {
      done += thisMax;
      count++;
      next++;
    } else if (max === onlyMax) {
      singles.add(i);
      done += onlyMax;
      count++;
    } else if (max === nextMax) {
      i++;
      next = i + 1;
    }
  }

  return done;
}