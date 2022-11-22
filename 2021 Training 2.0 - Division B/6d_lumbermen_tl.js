const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

readline
  .on('line', (line) => {
    const result = solution(parseInput(line));
    console.log(result);
  })
  .on('close', () => {
    process.exit(0);
  });

function parseInput(line) {
  return line.trim().split(' ').map(Number);
}

function solution([eff1, dayOff1, eff2, dayOff2, trees]) {
  function countTrees(days) {
    const daysOff1 = Math.floor(days / dayOff1);
    const daysOff2 = Math.floor(days / dayOff2);
    return (days - daysOff1) * eff1 + (days - daysOff2) * eff2;
  }

  let min = 0;
  let max = Math.floor(trees / eff1) * 2 + 1;

  while (min < max) {
    const mid = Math.floor((min + max) / 2);

    if (trees - countTrees(mid) <= 0) {
      max = mid;
    } else {
      min = mid + 1;
    }
  }

  return min;
}
