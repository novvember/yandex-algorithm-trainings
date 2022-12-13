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
    const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const [n, m] = lines[0].trim().split(/\s+/).map(Number);
    const field = lines
      .slice(1, n + 1)
      .map((line) => line.trim())
      .join('');
    const words = lines
      .slice(n + 1, n + m + 2)
      .map((line) => line.trim())
      .join('');

    const map = new Array(LETTERS.length).fill(0);

    for (let letter of field) {
      map[LETTERS.indexOf(letter)]++;
    }

    for (let letter of words) {
      map[LETTERS.indexOf(letter)]--;
    }

    const answer = [];

    for (let i = 0; i < map.length; i++) {
      const n = map[i];
      const letter = LETTERS[i];

      if (n !== 0) answer.push(letter.repeat(n));
    }

    console.log(answer.join(''));
  });
