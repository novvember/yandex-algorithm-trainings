const _readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

_readline.on('line', (line) => {
  const p = +line.trim();

  const max = getMaxTriangle(p);
  const min = getMinTriangle(p);

  if (max === -1 && min === -1) {
    console.log(-1);
    return;
  }

  console.log([max, min].join('\n'));
});

function getMaxTriangle(p) {
  const a = Math.floor(p / 3);
  const b = Math.floor((p - a) / 2);
  const c = p - a - b;

  if (!checkTriangle(a, b, c)) return -1;

  return [a, b, c].join(' ');
}

function getMinTriangle(p) {
  let a = 1;
  let b = 0;
  let c = 0;

  for (; a < p / 2; a++) {
    b = Math.floor((p - a) / 2);
    c = p - a - b;
    if (checkTriangle(a, b, c)) break;
  }

  if (a + b + c !== p || !checkTriangle(a, b, c)) return -1;

  return [a, b, c].join(' ');
}

function checkTriangle(a, b, c) {
  const sides = [a, b, c].sort((a, b) => a - b);
  if (sides[0] === 0) return false;
  if (sides[0] + sides[1] <= sides[2]) return false;
  return true;
}
