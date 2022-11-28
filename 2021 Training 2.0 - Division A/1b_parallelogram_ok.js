const _readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const lines = [];

_readline
  .on('line', (line) => {
    lines.push(line);
  })
  .on('close', () => {
    const n = +lines[0].trim();
    const coords = lines
      .slice(1, n + 1)
      .map((line) => line.trim().split(/\s+/g).map(Number));

    const answers = [];

    coords.forEach((dots) => {
      const [x1, y1, x2, y2, x3, y3, x4, y4] = dots;

      const result = solution([
        [x1, y1],
        [x2, y2],
        [x3, y3],
        [x4, y4],
      ]);

      answers.push(result);
    });

    console.log(answers.join('\n'));
  });

function solution([a, b, c, d]) {
  function getRatio(a, b) {
    if (a[0] === b[0]) return 'vertical';
    return (a[1] - b[1]) / (a[0] - b[0]);
  }

  function checkDots([a, b, c, d]) {
    const ab = getRatio(a, b);
    const cd = getRatio(c, d);
    const bc = getRatio(b, c);
    const ad = getRatio(a, d);

    if (ab === cd && bc === ad) return true;
    return false;
  }

  function validateDots(dots) {
    const uniqueDots = new Set(dots.map((dot) => dot[0] + ' ' + dot[1]));
    if (uniqueDots.size === dots.length) return true;
    return false;
  }

  if (!validateDots([a, b, c, d])) return 'NO';

  const res =
    checkDots([a, b, c, d]) ||
    checkDots([a, b, d, c]) ||
    checkDots([a, c, b, d]) ||
    checkDots([a, c, d, b]);

  if (res) return 'YES';
  else return 'NO';
}
