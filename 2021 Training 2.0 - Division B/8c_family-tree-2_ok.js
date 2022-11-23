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
    let n = Number(lines[0].trim());
    let nodes = lines.slice(1, n).map((line) => line.split(' '));
    let queries = lines.slice(n).map((line) => line.split(' '));

    const parents = {};

    for (let [child, parent] of nodes) {
      parents[child] = parent;
    }

    const answers = [];

    for (let [name1, name2] of queries) {
      const set1 = new Set();
      let name = name1;

      while (name) {
        set1.add(name);
        name = parents[name];
      }

      name = name2;

      while (true) {
        if (set1.has(name)) {
          answers.push(name);
          break;
        } else {
          name = parents[name];
        }
      }
    }

    console.log(answers.join('\n'));
  });
