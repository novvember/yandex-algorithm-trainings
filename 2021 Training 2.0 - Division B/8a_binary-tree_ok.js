const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const result = parseInput(input);
    console.log(result);
    process.exit(0);
  });

function parseInput(input) {
  const output = [];
  const tree = new binaryTree();

  for (let line of input) {
    const [command, value] = line.trim().split(' ');

    if (command === 'ADD') {
      output.push(tree.add(+value));
    } else if (command === 'SEARCH') {
      output.push(tree.search(+value));
    } else if (command === 'PRINTTREE') {
      output.push(tree.print());
    }
  }

  return output.join('\n');
}

class binaryTree {
  constructor() {
    this._tree = this._createNode(null);
  }

  _createNode(num) {
    const node = {
      key: num,
      childLeft: null,
      childRight: null,
      parent: null,
    };
    return node;
  }

  _addNode(startNode, key) {
    if (this._tree.key === null) {
      this._tree.key = key;
      return this._tree;
    }

    if (startNode.key === key) return false;

    if (key < startNode.key) {
      if (startNode.childLeft === null) {
        const node = this._createNode(key);
        node.parent = startNode;
        startNode.childLeft = node;
        return node;
      }

      return this._addNode(startNode.childLeft, key);
    } else {
      if (startNode.childRight === null) {
        const node = this._createNode(key);
        node.parent = startNode;
        startNode.childRight = node;
        return node;
      }

      return this._addNode(startNode.childRight, key);
    }
  }

  add(num) {
    const result = this._addNode(this._tree, num);
    return result ? 'DONE' : 'ALREADY';
  }

  _findNode(startNode, key) {
    if (startNode === null) return false;
    if (startNode.key === key) return startNode;

    if (key < startNode.key) {
      return this._findNode(startNode.childLeft, key);
    } else {
      return this._findNode(startNode.childRight, key);
    }
  }

  search(num) {
    if (!this._tree) return 'NO';
    return this._findNode(this._tree, num) ? 'YES' : 'NO';
  }

  _getAllNodes(startNode, nodeLevel) {
    const nodes = [];

    if (startNode.childLeft !== null) {
      nodes.push(...this._getAllNodes(startNode.childLeft, nodeLevel + 1));
    }

    nodes.push(['.'.repeat(nodeLevel), startNode.key]);

    if (startNode.childRight !== null) {
      nodes.push(...this._getAllNodes(startNode.childRight, nodeLevel + 1));
    }

    return nodes;
  }

  print() {
    const nodes = this._getAllNodes(this._tree, 0);
    return nodes.map((line) => line.join('')).join('\n');
  }
}
