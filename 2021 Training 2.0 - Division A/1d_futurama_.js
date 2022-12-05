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

    const bodies = {};
    const availableSwaps = {};

    for (let i = 1; i <= count; i++) {
      bodies[i] = i;

      availableSwaps[i] = new Set(new Array(count).fill(0).map((_, i) => i + 1));
      availableSwaps[i].delete(i);
    }

    function swap(a, b) {
      [bodies[a], bodies[b]] = [bodies[b], bodies[a]];
      availableSwaps[a].delete(b);
      availableSwaps[b].delete(a);
    }

    for (let [a, b] of pairs) {
      swap(a, b);
    }

    function getWrongBodies() {
      const set = new Set();

      for (let body in bodies) {
        if (bodies[body] !== +body) set.add(+body);
      }

      return set;
    }

    function getRightBodies() {
      const set = new Set();

      for (let body in bodies) {
        if (bodies[body] === +body) set.add(+body);
      }

      return set;
    }

    let wrongBodies = getWrongBodies();
    let rightBodies = getRightBodies();

    while (wrongBodies.size !== 0) {
      
    }

    
  });
