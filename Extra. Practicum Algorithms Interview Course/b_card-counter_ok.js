function getCardCount(n, k, cards) {
  const reversedCards = cards.slice().reverse();
  const prefixSumsLeft = new Array(cards.length + 1).fill(0);
  const prefixSumsRight = new Array(cards.length + 1).fill(0);

  for (let i = 0; i < cards.length; i++) {
    prefixSumsLeft[i + 1] = cards[i] + prefixSumsLeft[i];
  }

  for (let i = 0; i < reversedCards.length; i++) {
    prefixSumsRight[i + 1] = reversedCards[i] + prefixSumsRight[i];
  }

  let max = 0;

  for (let left = 0; left <= k; left++) {
    const right = k - left;
    const sum = prefixSumsLeft[left] + prefixSumsRight[right];
    max = Math.max(max, sum);
  }

  return max;
}

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const _inputLines = [];
let _curLine = 0;

readline
  .on('line', (line) => {
    _inputLines.push(line);
  })
  .on('close', solve);

function solve() {
  const n = readInt();
  const k = readInt();
  const cards = readArray();
  const ans = getCardCount(n, k, cards);
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
