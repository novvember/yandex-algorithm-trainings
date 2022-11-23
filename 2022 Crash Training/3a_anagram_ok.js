const input = [];

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const result = solution(parseInput(input));
    console.log(result);
    process.exit(0);
  });

function parseInput(input) {
  return input;
}

function solution([stringA, stringB]) {
  function createMap(string) {
    const startInd = 'a'.charCodeAt();
    const endInd = 'z'.charCodeAt();
    const map = new Array(endInd - startInd + 1).fill(0);

    for (let letter of string) {
      const code = letter.charCodeAt() - startInd;
      map[code]++;
    }

    return map.join();
  }

  const mapA = createMap(stringA);
  const mapB = createMap(stringB);

  return mapA === mapB ? 'YES' : 'NO';
}