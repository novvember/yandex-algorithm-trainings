const { networkInterfaces } = require('os');

class Vertex {
  constructor(weight, parent) {
    this.weight = weight;
    this.parent = parent;
  }
}

function getNumberOfUpgoingPaths(tree, x) {
  const children = {};
  let root;

  for (let i = 0; i < tree.length; i++) {
    children[i] = {
      id: i,
      weight: tree[i].weight,
      children: [],
    };
    if (tree[i].parent === -1) {
      root = children[i];
    } else {
      if (children[tree[i].parent] === undefined) {
        tree.push(tree[i]);
      } else {
        children[tree[i].parent].children.push(i);
      }
    }
  }

  let count = 0;
  const stack = [[root, new Set([x])]];

  while (stack.length > 0) {
    const [node, sums] = stack.pop();

    if (sums.has(node.weight)) count++;

    if (node.children.length > 0) {
      const newSums = new Set([x]);
      [...sums].forEach((sum) => {
        const newSum = sum - node.weight;
        newSums.add(newSum);
      });
      newSums.add(x);

      node.children.forEach((child) => stack.push([children[child], newSums]));
    }
  }

  return count;
}

const _readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const _inputLines = [];
let _curLine = 0;

_readline.on('line', (line) => {
  _inputLines.push(line);
});

_readline.on('close', solve);

function solve() {
  const firsLine = readArray();
  const n = firsLine[0];
  const x = firsLine[1];
  const tree = readTree(n);
  const ans = getNumberOfUpgoingPaths(tree, x);
  console.log(ans);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  var arr = _inputLines[_curLine]
    .trim(' ')
    .split(' ')
    .map((num) => Number(num));
  _curLine++;
  return arr;
}

function readTree(n) {
  let tree = [];
  for (let i = 0; i < n; i++) {
    let vertex = readArray();
    tree.push(new Vertex(vertex[1], vertex[0]));
  }
  return tree;
}
