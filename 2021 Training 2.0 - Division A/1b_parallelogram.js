const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

let input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const ans = [];
    parseInput(input).forEach((dots) => {
      const result = solution(dots);
      ans.push(result);
    });
    console.log(ans.join('\n'));
    process.exit(0);
  });

function parseInput(input) {
  input = input.slice(1);
  return input.map((coords) => coords.split(' ').map(Number));
}

function solution(coords) {
  function makeDots(coords) {
    const [x1, y1, x2, y2, x3, y3, x4, y4] = coords;
    return [
      [x1, y1],
      [x2, y2],
      [x3, y3],
      [x4, y4],
    ];
  }

  function sortDots(dots) {
    const a = dots.sort((a, b) => b[0] - a[0]).pop();
    const [b, d, c] = dots.sort((b, c) => getDist(a, b) - getDist(a, c));
    return [a, b, c, d];
  }

  function getDist(a, b) {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[01] - b[1]) ** 2);
  }

  function getRatio(a, b) {
    if (a[0] - b[0] === 0) return 'vertical';
    return (a[1] - b[1]) / (a[0] - b[0]);
  }

  let dots = makeDots(coords);
  const [a, b, c, d] = sortDots(dots);

  if (getRatio(a, b) === getRatio(c, d) && getRatio(b, c) === getRatio(a, d))
    return 'YES';
  else return 'NO';
}
