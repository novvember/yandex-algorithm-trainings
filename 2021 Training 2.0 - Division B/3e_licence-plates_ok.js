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
  const personsCount = Number(input[0].trim());
  const persons = [];
  for (let i = 1; i < 1 + personsCount; i++) {
    persons.push(input[i].trim());
  }
  const carsCount = Number(input[personsCount + 1].trim());
  const cars = [];
  for (let i = personsCount + 2; i < input.length; i++) {
    cars.push(input[i].trim());
  }

  return [persons, cars];
}

function solution([persons, cars]) {
  const carsSets = cars.map((car) => new Set(car.split('')));
  const map = {};

  for (let i = 0; i < cars.length; i++) {
    let count = 0;
    persons.forEach((person) => {
      if (person.split('').every((letter) => carsSets[i].has(letter))) count++;
    });
    map[cars[i]] = count;
  }

  let max = Math.max(...Object.values(map));
  return cars.filter((car) => map[car] === max).join('\n');
}
