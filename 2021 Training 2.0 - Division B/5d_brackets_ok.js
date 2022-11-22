const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

readline
  .on('line', (line) => {
    const result = solution(line);
    console.log(result);
  })
  .on('close', () => {
    process.exit(0);
  });

function solution(line) {
  line = line.trim();
  let openCount = 0;

  for (let char of line) {
    if (char === '(') {
      openCount++;
    } else {
      if (openCount <= 0) return 'NO';
      openCount--;
    }
  }

  if (openCount > 0) return 'NO';
  return 'YES';
}
