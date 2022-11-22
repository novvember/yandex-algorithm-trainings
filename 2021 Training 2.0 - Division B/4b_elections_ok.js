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
  const votes = [];

  for (let i = 0; i < input.length; i++) {
    votes.push(input[i].trim().split(' '));
  }

  return votes;
}

function solution(votes) {
  const map = {};

  for (let vote of votes) {
    const [name, num] = vote;
    if (!map[name]) map[name] = 0;
    map[name] += +num;
  }

  const names = Object.keys(map).sort();

  return names.map((name) => name + ' ' + map[name]).join('\n');
}
