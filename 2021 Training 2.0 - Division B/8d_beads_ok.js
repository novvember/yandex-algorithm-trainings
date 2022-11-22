const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const lines = [];

readline
  .on('line', (line) => {
    lines.push(line);
  })
  .on('close', () => {
    const n = Number(lines[0].trim());
    const links = lines.slice(1).map((line) => line.split(' ').map(Number));

    const connections = {};

    for (let [start, finish] of links) {
      if (connections[start] === undefined) connections[start] = [];
      if (connections[finish] === undefined) connections[finish] = [];
      connections[start].push(finish);
      connections[finish].push(start);
    }

    function countNodes(node, nodeFrom) {
      const children = connections[node].filter((node) => node !== nodeFrom);
      if (children.length === 0) return 1;
      let max = 0;
      for (let child of children) {
        max = Math.max(max, countNodes(child, node));
      }
      return 1 + max;
    }

    const roots = Object.entries(connections)
      .filter((entry) => entry[1].length === 1)
      .map((entry) => +entry[0]);

    let max = 0;

    for (let root of roots) {
      max = Math.max(max, countNodes(root, null));
    }

    console.log(max);
  });
