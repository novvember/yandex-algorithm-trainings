function solution(address) {
  const input = address.split(/\/+/);
  const output = [];

  for (let dir of input) {
    if (!dir) continue;
    if (dir === '.') continue;

    if (dir === '..') {
      output.pop();
    } else {
      output.push(dir);
    }
  }

  return '/' + output.join('/');
}

const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

readline.on('line', (line) => {
  const result = solution(line);
  console.log(result);
  process.exit(0);
});
