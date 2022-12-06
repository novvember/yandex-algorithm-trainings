const _readline = require('readline').createInterface(
  process.stdin,
  process.stdout,
);

const lines = [];

_readline
  .on('line', (line) => {
    lines.push(line);
  })
  .on('close', () => {
    const max = +lines[0].trim();

    let set = new Set(new Array(max).fill(0).map((_, i) => i + 1));
    const queries = lines.slice(1);
    const answers = [];

    for (let query of queries) {
      if (query.trim() === 'HELP') break;

      const yesSet = new Set();

      query
        .trim()
        .split(/\s+/g)
        .forEach((num) => {
          if (set.has(+num)) {
            yesSet.add(+num);
            set.delete(+num);
          }
        });

      if (set.size >= yesSet.size) {
        answers.push('NO');
      } else {
        set = yesSet;
        answers.push('YES');
      }
    }

    answers.push([...set].join(' '));

    console.log(answers.join('\n'));
  });
