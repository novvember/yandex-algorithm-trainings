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
    const strings = lines.slice(1).map((line) => line.trim());

    const answers = [];

    for (let string of strings) {
      const codes = getCodesFromString(string);
      answers.push(codes.length);
      answers.push(...codes);
    }

    console.log(answers.join('\n'));
  });

function getCodesFromString(string) {
  const tree = buildTree(string);
  const codes = getCodesFromTree(tree, []);
  return codes;
}

function buildTree(string) {
  const tree = {
    up: null,
    left: null,
    right: null,
    type: 'root',
  };

  let currentNode = tree;

  for (let char of string) {
    if (char === 'D') {
      const child = {
        up: currentNode,
        left: null,
        right: null,
        type: 'left',
      };

      currentNode.left = child;
      currentNode = child;
    } else if (char === 'U') {
      while (currentNode.type === 'right') {
        currentNode = currentNode.up;
      }
      currentNode = currentNode.up;

      const child = {
        up: currentNode,
        left: null,
        right: null,
        type: 'right',
      };

      currentNode.right = child;
      currentNode = child;
    }
  }

  return tree;
}

function getCodesFromTree(root, prefixList) {
  if (root.left === null && root.right === null) {
    return [prefixList.join('')];
  }

  prefixList.push(0);
  const answer = getCodesFromTree(root.left, prefixList);
  prefixList.pop();
  prefixList.push(1);
  answer.push(...getCodesFromTree(root.right, prefixList));
  prefixList.pop();
  return answer;
}
