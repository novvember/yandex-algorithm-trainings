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
    const [n, k] = lines[0].trim().split(/\s+/g).map(Number);
    const numbers = lines[1].trim().split(/\s+/g).map(Number);

    const sum0 = numbers.reduce((sum, number) => sum + number, 0);
    const sums = [sum0];

    for (let i = 0; i < k; i++) {
      const sum = sums[sums.length - 1];
      sums.push(sum / (n - 1));
    }

    let min = Infinity;
    let max = -Infinity;

    for (let number of numbers) {
      let origin = number;

      for (let i = 1; i <= k; i++) {
        origin = sums[i] - origin;
      }

      min = Math.min(origin, min);
      max = Math.max(origin, max);
    }

    console.log(max - min);
  });
