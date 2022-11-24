function getLongestIncreasingPath(matrix) {
  function countWay([x, y], sum) {
    sum++;

    if (maxLengths[y][x] >= sum) return false;

    maxLengths[y][x] = sum;
    max = Math.max(max, sum);

    if (matrix[y - 1] && matrix[y - 1][x] > matrix[y][x]) {
      countWay([x, y - 1], sum);
    }
    if (matrix[y + 1] && matrix[y + 1][x] > matrix[y][x]) {
      countWay([x, y + 1], sum);
    }
    if (matrix[y][x - 1] > matrix[y][x]) {
      countWay([x - 1, y], sum);
    }
    if (matrix[y][x + 1] > matrix[y][x]) {
      countWay([x + 1, y], sum);
    }
  }

  const maxLengths = new Array(matrix.length)
    .fill(0)
    .map((cell) => new Array(matrix[0].length).fill(0));

  let max = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      countWay([x, y], 0);
    }
  }

  return max;
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
  const matrix = readMatrix();
  const ans = getLongestIncreasingPath(matrix);
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

function readMatrix() {
  let sizes = readArray();
  let n = sizes[0];
  let matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push(readArray());
  }
  return matrix;
}

function generateMatrix(n, m) {
  return new Array(n)
    .fill(0)
    .map((cell) =>
      new Array(m).fill(0).map((cell) => Math.floor(1000 * Math.random() + 1)),
    );
}

// Тестирование на случайных числах (в поисках ошибки RE)

// function test() {
//   for (let i = 0; i < 1000000; i++) {
//     const n = Math.floor(100 * Math.random() + 1);
//     const m = Math.floor(100 * Math.random() + 1);

//     try {
//       const res = getLongestIncreasingPath(generateMatrix(n, m));
//       console.log(i);
//     } catch {
//       debugger;
//     }
//   }
// }

// test();
