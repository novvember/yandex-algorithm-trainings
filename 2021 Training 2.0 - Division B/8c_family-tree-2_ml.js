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
      const result = tree.findCommonParent(name1, name2);
      answers.push(result);
    }

    console.log(answers.join('\n'));
  });

class Tree {
  constructor() {
    this._root = null;
  }

  _createNode(name) {
    const node = {
      name,
      parent: null,
      children: [],
    };
    return node;
  }

  add(childName, parentName) {
    if (this._root === null) {
      const parent = this._createNode(parentName);
      this._root = parent;
    }

    const child = this._createNode(childName);
    const parent = this._find(parentName, this._root);
    if (!parent) return false;
    child.parent = parent;
    parent.children.push(child);
    return true;
  }

  _find(name, node) {
    if (node.name === name) return node;
    if (node.children.length === 0) return false;

    for (let child of node.children) {
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

  _findAllParents(name) {
    const child = this._find(name, this._root);
    const parentsNames = [];

    let currentNode = child;

    while (currentNode !== null) {
      parentsNames.push(currentNode.name);
      currentNode = currentNode.parent;
    }

    return parentsNames;
  }

  findCommonParent(name1, name2) {
    const parents1 = this._findAllParents(name1);
    const parents2 = this._findAllParents(name2);

    return parents1.find((name) => parents2.includes(name));
  }
}
