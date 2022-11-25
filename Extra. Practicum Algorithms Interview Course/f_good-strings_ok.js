function convertToGoodString(string) {
  function areBadLetters(a, b) {
    return a.toLowerCase() === b.toLowerCase() && a !== b;
  }

  if (string.length < 2) return string;

  string = string.split('');

  let l = 0;
  let r = 0;

  while (r < string.length) {
    if (areBadLetters(string[l], string[r])) {
      string[l] = null;
      string[r] = null;

      r++;
      while (string[l] === null) {
        l--;
      }

      if (!string[l]) {
        l = r;
        r = l + 1;
      }
    } else {
      l = r;
      r = l + 1;
    }
  }

  return string.filter((letter) => letter !== null).join('');
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
  const probablyBadString = readLine();
  const ans = convertToGoodString(probablyBadString);
  console.log(ans);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
