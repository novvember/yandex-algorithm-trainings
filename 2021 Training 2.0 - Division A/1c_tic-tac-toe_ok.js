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
    const field = lines
      .slice(0, 3)
      .map((line) => line.trim().split(/\s+/g).map(Number));
    const answer = solution(field);
    console.log(answer);
  });

function solution(field) {
  function countCells(field) {
    const count = [0, 0, 0];

    for (let row of field) {
      for (let cell of row) {
        count[cell]++;
      }
    }

    return count;
  }

  function checkWins(field) {
    const wins = [0, 0, 0];

    for (let y = 0; y < field.length; y++) {
      const set = new Set(field[y]);
      const value = field[y][0];
      if (set.size === 1) wins[value]++;
    }

    for (let x = 0; x < field[0].length; x++) {
      const set = new Set([field[0][x], field[1][x], field[2][x]]);
      const value = field[0][x];
      if (set.size === 1) wins[value]++;
    }

    {
      const set = new Set([field[0][0], field[1][1], field[2][2]]);
      const value = field[1][1];
      if (set.size === 1) wins[value]++;
    }

    {
      const set = new Set([field[2][0], field[1][1], field[0][2]]);
      const value = field[1][1];
      if (set.size === 1) wins[value]++;
    }

    return wins;
  }

  const count = countCells(field);
  const wins = checkWins(field);

  if (wins[1] === 2 && wins[2] === 0 && count[0] === 0) return 'YES';

  if (!(wins[1] + wins[2] === 1 || wins[1] + wins[2] === 0)) return 'NO';

  if (
    wins[1] === 0 &&
    wins[2] === 0 &&
    !(count[1] - count[2] === 0 || count[1] - count[2] === 1)
  )
    return 'NO';

  if (wins[1] && !(count[1] - count[2] === 1)) return 'NO';

  if (wins[2] && !(count[1] - count[2] === 0)) return 'NO';

  return 'YES';
}
