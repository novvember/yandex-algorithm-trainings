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
  const words = [];

  for (let i = 0; i < input.length; i++) {
    words.push(...input[i].trim().split(' '));
  }

  return words;
}

function solution(words) {
  const map = {};

  for (let word of words) {
    if (!map[word]) map[word] = 0;
    map[word]++;
  }

  const list = Object.entries(map).sort((a, b) => {
    if ((a[1] === b[1])) return a[0].localeCompare(b[0]);
    return b[1] - a[1];
  });

  return list.map((entrie) => entrie[0]).join('\n');
}
