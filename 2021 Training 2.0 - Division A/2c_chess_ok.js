const { join } = require('path');

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
    const n = +lines[0].trim();
    const cells = lines
      .slice(1, 1 + n)
      .map((line) => line.trim().split(/\s+/).map(Number));

    const getId = (cell) => cell.join(' ');

    const cutIds = new Set(cells.map(getId));
    const checkedIds = new Set();
    const stack = [cells[0]];

    let count = 0;

    while (stack.length) {
      function checkSideCell(cell) {
        const id = getId(cell);

        if (!cutIds.has(id)) {
          count++;
        } else if (!checkedIds.has(id)) {
          stack.push(cell);
          checkedIds.add(id);
        }
      }

      const [x, y] = stack.pop();

      checkSideCell([x + 1, y]);
      checkSideCell([x - 1, y]);
      checkSideCell([x, y + 1]);
      checkSideCell([x, y - 1]);

      checkedIds.add(getId([x, y]));
    }

    console.log(count);
  });
