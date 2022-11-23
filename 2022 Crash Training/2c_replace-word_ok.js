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
    const result = solution(parseInput(input));
    console.log(result);
    process.exit(0);
  });
  
function parseInput(input) {
  input = input.map((line) => line.split(' '));
  const dict = input[0];
  const words = input[1];
  return [dict, words];
}

function solution([dict, words]) {
  const output = [];
  dict = new Set(dict);

  for (let word of words) {
    let isDone = false;

    for (let i = 1; i <= word.length; i++) {
      const short = word.slice(0, i);
      if (dict.has(short)) {
        output.push(short);
        isDone = true;
        break;
      }
    }

    if (!isDone) output.push(word);
  }

  return output.join(' ');
}