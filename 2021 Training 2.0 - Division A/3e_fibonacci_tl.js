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
    const fibonacci = new Set(['1', '1']);
    let prev = 1n;
    let prevPrev = 1n;

    while (true) {
      let current = prev + prevPrev;
      prevPrev = prev;
      prev = current;
      current = current.toString();
      fibonacci.add(current);
      if (current.length > 5000) break;
    }

    const n = +lines[0].trim();

    for (let i = 1; i < n + 1; i++) {
      const number = lines[i].trim();
      if (fibonacci.has(number)) console.log('Yes');
      else console.log('No');
    }
  });
