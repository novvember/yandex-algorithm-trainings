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
    function findYsOfCircle(x) {
      const d = (2 * yc) ** 2 - 4 * (yc ** 2 - r ** 2 + (x - xc) ** 2);
      if (d < 0) return null;
      return [(2 * yc + Math.sqrt(d)) / 2, (2 * yc - Math.sqrt(d)) / 2];
    }

    const [x1, y1, x2, y2] = lines[0].trim().split(/\s+/g).map(Number);
    const xLeft = Math.min(x1, x2);
    const xRight = Math.max(x1, x2);
    const yDown = Math.min(y1, y2);
    const yUp = Math.max(y1, y2);

    const [xc, yc, r] = lines[1].trim().split(/\s+/g).map(Number);

    let count = 0;

    for (let x = xLeft; x <= xRight; x++) {
      const ys = findYsOfCircle(x);
      if (!ys) continue;

      let [y1, y2] = ys;

      y1 = Math.min(yUp, Math.floor(y1));
      y2 = Math.max(yDown, Math.ceil(y2));
      if (y2 > y1) continue;

      count += y1 - y2 + 1;
    }

    console.log(count);
  });
