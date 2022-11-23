const input = [];

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const result = solution(parseInput(input));
    console.log(result);
    process.exit(0);
  });

function parseInput(input) {
  const count = Number(input[0].trim());
  const nodes = [];

  for (let i = 1; i < input.length; i++) {
    nodes.push(input[i].trim().split(' ').map(Number));
  }

  return [count, nodes];
}

function solution([count, nodes]) {
  function countTree() {
    sizes[1] = 1;
    const tasks = [];

    for (let neighbour of neighbours[1]) {
      tasks.push({ value: neighbour, addTo: 1 });
    }

    while (tasks.length) {
      const task = tasks.pop();
      const value = task.value;
      const addTo = task.addTo;

      if (sizes[value] === null) {
        sizes[value] = 1;
        tasks.push({ value: value, addTo: addTo });
        for (let neighbour of neighbours[value]) {
          if (!sizes[neighbour]) tasks.push({ value: neighbour, addTo: value });
        }
      } else {
        sizes[addTo] += sizes[value];
      }
    }
  }

  const neighbours = new Array(count + 1).fill();

  for (let node of nodes) {
    const [a, b] = node;
    if (!neighbours[a]) neighbours[a] = [];
    if (!neighbours[b]) neighbours[b] = [];
    neighbours[a].push(b);
    neighbours[b].push(a);
  }

  const sizes = new Array(count + 1).fill(null);
  countTree(1);
  return sizes.slice(1).join(' ');
}