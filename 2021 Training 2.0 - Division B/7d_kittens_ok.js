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
  const m = +input[0].trim().split(' ')[1];
  const cats = input[1].trim().split(' ').map(Number);
  const lines = [];
  for (let i = 2; i < 2 + m; i++) {
    const line = input[i].trim().split(' ').map(Number);
    lines.push(line);
  }
  return [cats, lines];
}

function slow([cats, lines]) {
  const events = [];

  for (let cat of cats) {
    events.push({
      type: 'cat',
      priority: 0,
      x: cat,
    });
  }

  for (let i = 0; i < lines.length; i++) {
    const [start, end] = lines[i];

    events.push({
      type: 'line-start',
      priority: -1,
      x: start,
      line: i,
    });

    events.push({
      type: 'line-end',
      priority: 1,
      x: end,
      line: i,
    });
  }

  events.sort((a, b) => a.x - b.x || a.priority - b.priority);

  const catsOnLines = new Array(lines.length).fill(0);
  const currentLines = new Set();

  for (let event of events) {
    if (event.type === 'line-start') {
      currentLines.add(event.line);
    } else if (event.type === 'line-end') {
      currentLines.delete(event.line);
    } else if (event.type === 'cat') {
      [...currentLines].forEach((i) => catsOnLines[i]++);
    }
  }

  return catsOnLines.join('\n');
}

function solution([cats, lines]) {
  function findLeft(x, nums) {
    let l = 0;
    let r = nums.length - 1;

    while (l < r) {
      const m = Math.floor((l + r) / 2);
      if (nums[m] >= x) {
        r = m;
      } else {
        l = m + 1;
      }
    }
    return nums[l] >= x ? l : -1;
  }

  function findRight(x, nums) {
    let l = 0;
    let r = nums.length - 1;
    while (l < r) {
      const m = Math.ceil((l + r) / 2);
      if (nums[m] <= x) {
        l = m;
      } else {
        r = m - 1;
      }
    }
    return nums[l] <= x ? l : -1;
  }

  cats.sort((a, b) => a - b);
  const catsOnLines = new Array(lines.length).fill(0);

  for (let i = 0; i < lines.length; i++) {
    const [start, end] = lines[i];
    const left = findLeft(start, cats);
    const right = findRight(end, cats);

    if (left <= right && left !== -1) {
      catsOnLines[i] = right - left + 1;
    }
  }

  return catsOnLines.join('\n');
}
