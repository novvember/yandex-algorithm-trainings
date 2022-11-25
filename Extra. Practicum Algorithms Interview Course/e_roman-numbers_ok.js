function convertToArabic(romanNumber) {
  function toRoman(number) {
    function makeDigit(count, i, v, x) {
      if (count === 0) return '';
      else if (count < 4) return i.repeat(count);
      else if (count === 4) return i + v;
      else if (count < 9) return v + i.repeat(count - 5);
      else return i + x;
    }

    const digits = {};

    let rest = number;
    digits[1000] = Math.floor(rest / 1000);
    rest = rest - digits[1000] * 1000;
    digits[100] = Math.floor(rest / 100);
    rest = rest - digits[100] * 100;
    digits[10] = Math.floor(rest / 10);
    rest = rest - digits[10] * 10;
    digits[1] = rest;

    if (digits[1000] > 3) return false;

    let roman = '';
    roman += makeDigit(digits[1000], 'M');
    roman += makeDigit(digits[100], 'C', 'D', 'M');
    roman += makeDigit(digits[10], 'X', 'L', 'C');
    roman += makeDigit(digits[1], 'I', 'V', 'X');
    return roman;
  }

  function fromRoman(roman) {
    const VALUES = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let number = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
      const letter = roman[i];
      const nextLetter = roman[i + 1];

      if (i === roman.length - 1 || VALUES[letter] >= VALUES[nextLetter]) {
        number += VALUES[letter];
      } else {
        number -= VALUES[letter];
      }
    }

    return number;
  }

  const number = fromRoman(romanNumber);
  const propperRoman = toRoman(number);
  return romanNumber === propperRoman ? number : -1;
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
  const romanNumber = readLine();
  const ans = convertToArabic(romanNumber);
  console.log(ans);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
