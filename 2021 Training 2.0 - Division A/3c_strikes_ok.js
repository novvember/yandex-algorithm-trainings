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
    const [n, k] = lines[0].trim().split(/\s+/).map(Number);
    const strikes = new Set();

    for (let i = 1; i <= k; i++) {
      const [start, period] = lines[i].trim().split(/\s+/).map(Number);

      for (let j = start; j <= n; j += period) {
        if (j % 7 === 0 || (j + 1) % 7 === 0) continue;
        strikes.add(j);
      }
    }

    console.log(strikes.size);
  });
