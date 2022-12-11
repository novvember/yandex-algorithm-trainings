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
    const [n, m] = lines[0].trim().split(/\s+/).map(Number);
    const newLinks = new Set();

    for (let i = 1; i < m + 1; i++) {
      const [a, b] = lines[i].trim().split(/\s+/);
      if (a === b) continue;
      const link = [a, b].sort((a, b) => a - b).join(' ');
      newLinks.add(link);
    }

    const ans = [[n, newLinks.size].join(' '), ...newLinks];
    console.log(ans.join('\n'));
  });
