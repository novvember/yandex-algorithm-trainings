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
  const wanted = input[1];
  const obtained = input[3];
  return [wanted, obtained];
}

function solution([wanted, obtained]) {
  const firstClass = {};
  const secondClass = {};
  const thirdClass = {};

  function getPattern2(element) {
    return element.toLowerCase();
  }

  function getPattern3(element) {
    return getPattern2(element)
      .split('')
      .map((char) => ('aeiou'.includes(char) ? '.' : char))
      .join('');
  }

  function addFirstClass(element) {
    if (!firstClass[element]) firstClass[element] = element;
  }

  function addSecondClass(element) {
    const pattern = getPattern2(element);
    if (!secondClass[pattern]) secondClass[pattern] = element;
  }

  function addThirdClass(element) {
    const pattern = getPattern3(element);
    if (!thirdClass[pattern]) thirdClass[pattern] = element;
  }

  for (let element of wanted) {
    addFirstClass(element);
  }

  for (let element of wanted) {
    addSecondClass(element);
  }

  for (let element of wanted) {
    addThirdClass(element);
  }

  const output = [];

  for (let element of obtained) {
    if (firstClass[element]) {
      output.push(firstClass[element]);
      continue;
    }

    const pattern2 = getPattern2(element);
    if (secondClass[pattern2]) {
      output.push(secondClass[pattern2]);
      continue;
    }

    const pattern3 = getPattern3(element);
    if (thirdClass[pattern3]) {
      output.push(thirdClass[pattern3]);
      continue;
    }

    output.push('');
  }

  return output.join(' ');
}