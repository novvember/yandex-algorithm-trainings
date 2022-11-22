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
  const groups = input[1].trim().split(' ').map(Number);
  const rooms = input[2].trim().split(' ').map(Number);

  return [groups, rooms];
}

function solution([groups, rooms]) {
  groups = groups
    .map((group, i) => ({
      value: group,
      id: i + 1,
      room: 0,
    }))
    .sort((a, b) => a.value - b.value);

  rooms = rooms
    .map((room, i) => ({
      value: room,
      id: i + 1,
    }))
    .sort((a, b) => a.value - b.value);

  let currentGroup = 0;
  let count = 0;

  for (let room of rooms) {
    if (groups[currentGroup].value < room.value) {
      groups[currentGroup].room = room.id;
      count++;
      currentGroup++;
    }
  }

  return (
    count +
    '\n' +
    groups
      .sort((a, b) => a.id - b.id)
      .map((group) => group.room)
      .join(' ')
  );
}
