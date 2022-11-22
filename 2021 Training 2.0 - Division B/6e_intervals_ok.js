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
  const n = input[0].trim().split(' ').map(Number)[1];
  const dots = input[1].trim().split(' ').map(Number);
  return [n, dots];
}

function solution([n, dots]) {
  function checkCover(length) {
    function findNextUncovered(x) {
      let l = 0;
      let r = dots.length - 1;

      while (l < r) {
        const m = Math.floor((l + r) / 2);
        if (dots[m] > x) {
          r = m;
        } else {
          l = m + 1;
        }
      }

      return dots[l] > x ? l : false;
    }

    let left = n;
    let i = findNextUncovered(-Infinity);
    let x = dots[i];

    while (i !== false) {
      x = dots[i] + length;
      left--;
      i = findNextUncovered(x);
    }

    return left >= 0;
  }

  dots.sort((a, b) => a - b);

  let r = (dots[dots.length - 1] - dots[0]) / n + 1;
  let l = 0;

  while (l < r) {
    const m = Math.floor((l + r) / 2);

    if (checkCover(m)) {
      r = m;
    } else {
      l = m + 1;
    }
  }

  return l;
}
