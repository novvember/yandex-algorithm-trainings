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
  const groups = input[1].trim().split(' ').map(Number);
  const rooms = input[3].trim().split(' ').map(Number);
  return [groups, rooms];
}


function solution([groups, rooms]) {
  groups.sort((a, b) => a - b);
  rooms.sort((a, b) => a - b);

  let g = 0;
  let r = 0;

  while (g < groups.length && r < rooms.length) {
    if (groups[g] <= rooms[r]) {
      g++;
    }
    r++;
  }

  return g;
}