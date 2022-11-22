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
  const s = Number(input[0].trim());
  const arrays = [];
  for (let i = 1; i < 4; i++) {
    const array = input[i].trim().split(' ').map(Number);
    array.shift();
    arrays.push(array);
  }

  return [s, arrays];
}

function solution([s, [a, b, c]]) {
  const setC = new Set(c);

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      const rest = s - a[i] - b[j];
      if (setC.has(rest)) {
        const k = c.indexOf(rest);
        return [i, j, k].join(' ');
      }
    }
  }

  return -1;
}
