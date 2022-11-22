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

    const answers = [];
    const tree = new Tree();

    for (let [childName, parentName] of nodes) {
      const res = tree.add(childName, parentName);
      if (!res) nodes.push([childName, parentName]);
    }

    for (let [name1, name2] of queries) {
      const result = tree.findParent(name1, name2);
      if (!result) {
        answers.push(0);
      } else if (result === name1) {
        answers.push(1);
      } else {
        answers.push(2);
      }
    }

    console.log(answers.join(' '));
  });

class Tree {
  constructor() {
    this._root = null;
  }

  _createNode() {
    const node = [null, []];
    return node;
  }

  add(childName, parentName) {
    if (this._root === null) {
      const parent = this._createNode();
      parent[0] = parentName;
      this._root = parent;
    }

    const child = this._createNode();
    child[0] = childName;
    const parent = this._find(parentName, this._root);
    if (!parent) return false;
    parent[1].push(child);
    return true;
  }

  _find(name, node) {
    if (node[0] === name) return node;
    if (node[1].length === 0) return false;

    for (let child of node[1]) {
      const res = this._find(name, child);
      if (res) return res;
    }

    return false;
  }

  findParent(name1, name2) {
    const person1 = this._find(name1, this._root);
    const person2 = this._find(name2, this._root);
    if (!person1 || !person2) return false;

    const isName1Parent = this._find(name2, person1);
    const isName2Parent = this._find(name1, person2);

    if (!isName1Parent && !isName2Parent) return false;

    if (isName1Parent) return name1;
    return name2;
  }
}
