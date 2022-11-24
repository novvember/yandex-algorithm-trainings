function getNumberOfGoodPairs(n, numbers) {
  const residues = {};
  let count = 0;

  for (let i = 0; i < numbers.length; i++) {
    const residue = numbers[i] % 200;
    if (residues[residue] !== undefined) count += residues[residue];
    else residues[residue] = 0;
    residues[residue]++;
  }

  return count;
}

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const _inputLines = [];
let _curLine = 0;

readline.on('line', (line) => {
  _inputLines.push(line);
});

readline.on('close', solve);

function solve() {
  const n = readInt();
  const numbers = readArray();
  const ans = getNumberOfGoodPairs(n, numbers);
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
