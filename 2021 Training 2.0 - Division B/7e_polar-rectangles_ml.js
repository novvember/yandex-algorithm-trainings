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
  const count = +input[0].trim();
  const areas = [];
  for (let i = 1; i < 1 + count; i++) {
    areas.push(input[i].trim().split(' ').map(Number));
  }
  return areas;
}

function solution(rects) {
  const END = 2 * Math.PI.toFixed(7);
  let rMin = 0;
  let rMax = Infinity;
  const angleEvents = [];

  for (let [r1, r2, f1, f2] of rects) {
    rMin = Math.max(r1, rMin);
    rMax = Math.min(r2, rMax);

    angleEvents.push(f1);
    angleEvents.push(-f2);

    if (f1 > f2) {
      angleEvents.push(0);
      angleEvents.push(-END);
    }
  }

  angleEvents.sort((a, b) => Math.abs(a) - Math.abs(b));

  let counter = 0;
  let angleSum = 0;
  let prevStart = 0;

  for (let event of angleEvents) {
    const f = Math.abs(event);

    if (event >= 0) {
      counter++;
      if (counter === rects.length) {
        prevStart = f;
      }
    } else {
      counter--;
      if (counter === rects.length - 1) {
        angleSum += f - prevStart;
      }
    }
  }

  const square = (rMax ** 2 - rMin ** 2) * angleSum * 0.5;
  return square;
}
