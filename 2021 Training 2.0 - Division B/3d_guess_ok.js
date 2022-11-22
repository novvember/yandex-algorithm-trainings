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
  const max = Number(input[0].trim());
  const data = [];

  for (let i = 1; i < input.length - 1; i += 2) {
    if ((input[i].trim() === 'HELP')) break;
    const nums = input[i].trim().split(' ').map(Number);
    const res = input[i + 1];
    data.push([nums, res]);
  }

  return [max, data];
}

function solution([max, data]) {
  let set = new Set();

  for (let i = 1; i <= max; i++) {
    set.add(i);
  }

  data.forEach(([req, res]) => {
    if (res === 'NO') {
      req.forEach((num) => set.delete(num));
    } else {
      const reqSet = new Set(req);
      set = new Set([...reqSet].filter((num) => set.has(num)));
    }
  });

  return [...set].sort((a, b) => a - b).join(' ');
}
