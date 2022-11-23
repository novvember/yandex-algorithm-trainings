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
  return input.map((row) => row.split(' ').map(Number));
}

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

  if (count[1] - count[2] !== 1 && count[1] - count[2] !== 0) return 'NO';
  if (wins[1] + wins[2] > 1) return 'NO';

  if (wins[1] && count[1] - count[2] !== 1) return 'NO';
  if (wins[2] && count[1] - count[2] !== 0) return 'NO';

  return 'YES';
}
