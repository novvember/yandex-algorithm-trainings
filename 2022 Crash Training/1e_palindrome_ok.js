const readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

readline
  .on('line', (line) => {
    const result = solution(line);
    console.log(result);
    process.exit(0);
  });
  
function solution(string) {
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  const chars = string.split('');
  const centralPos = chars.length % 2 !== 0 ? Math.floor(chars.length / 2) : -1;
  let isDone = false;

  for (let i = 0; i < chars.length; i++) {
    if (i !== centralPos && chars[i] !== ALPHABET[0]) {
      chars[i] = ALPHABET[0];
      isDone = true;
      break;
    }
  }

  if (!isDone && chars.length > 1) {
    chars[chars.length - 1] = ALPHABET[1];
    isDone = true;
  }

  return isDone ? chars.join('') : '';
}