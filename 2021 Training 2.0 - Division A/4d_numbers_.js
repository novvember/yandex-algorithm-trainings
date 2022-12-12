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
    const a = lines[0].trim();
    const mapA = new Array(10).fill(0);
    for (let digit of a) {
      mapA[+digit]++;
    }

    const b = lines[1].trim();
    const mapB = new Array(10).fill(0);
    for (let digit of b) {
      mapB[+digit]++;
    }

    const ans = [];
    let i = 9;

    while (i >= 0) {
      if (mapA[i] > 0 && mapB[i] > 0) {
        ans.push(i);
        mapA[i]--;
        mapB[i]--;
      } else {
        i--;
      }
    }

    let result = ans.join('');
    if (result.length === 0) result = -1;
    else if (result.startsWith('0')) result = 0;

    console.log(result);
  });
