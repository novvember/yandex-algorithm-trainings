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
    const line = lines[1].trim();
    const map = new Array(LETTERS.length).fill(0);

    for (let letter of line) {
      map[LETTERS.indexOf(letter)]++;
    }

    const ans = [];
    let i = 0;

    while (i < map.length) {
      const isEnough = map[i] > 1;

      if (isEnough) {
        ans.push(LETTERS[i]);
        map[i] -= 2;
      } else {
        i++;
      }
    }

    const hasMiddleLetter = map.findIndex((num) => num > 0) !== -1;
    if (hasMiddleLetter) {
      const index = map.findIndex((num) => num > 0);
      ans.push(LETTERS[index]);
    }

    i = hasMiddleLetter ? ans.length - 2 : ans.length - 1;

    for (; i >= 0; i--) {
      ans.push(ans[i]);
    }

    console.log(ans.join(''));
  });
