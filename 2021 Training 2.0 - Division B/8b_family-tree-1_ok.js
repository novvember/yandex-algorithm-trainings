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

    function checkRelation(parent, targetName, children) {
      if (children[parent] === undefined) return false;

      for (let child of children[parent]) {
        if (child === targetName) return true;
        if (checkRelation(child, targetName, children)) return true;
      }

      return false;
    }

    const children = {};

    for (let [child, parent] of nodes) {
      if (!children[parent]) children[parent] = [];
      children[parent].push(child);
    }

    const answers = [];

    for (let [name1, name2] of queries) {
      const res1 = checkRelation(name1, name2, children);
      const res2 = checkRelation(name2, name1, children);

      if (res1) answers.push(1);
      else if (res2) answers.push(2);
      else answers.push(0);
    }

    console.log(answers.join(' '));
  });
