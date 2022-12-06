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
    const [count, n] = lines[0].trim().split(/\s+/g).map(Number);
    const pairs = lines
      .slice(1, 1 + n)
      .map((line) => line.trim().split(/\s+/g).map(Number));

    function swap(a, b) {
      swaps.push(a + ' ' + b);
      [bodies[a], bodies[b]] = [bodies[b], bodies[a]];
      return bodies[b];
    }

    const bodies = {};
    const swaps = [];

    for (let i = 1; i <= count; i++) {
      bodies[i] = i;
    }

    for (let [a, b] of pairs) {
      swap(a, b);
    }

    for (let i = 1; i < count - 1; i++) {
      if (bodies[i] !== i) {
        let j = i;
        while (bodies[j] !== i) j = swap(j, count - 1);
        j = swap(j, count);
        j = swap(j, count);
        swap(bodies[count - 1], count - 1);
      }
    }

    if (bodies[count - 1] === count) swap(count - 1, count);

    console.log(swaps.slice(n).join('\n'));
  });
