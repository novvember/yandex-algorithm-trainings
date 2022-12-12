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
    const n = +lines[0].trim();
    const scores = lines[1].trim().split(/\s+/g).map(Number);
    const nums = lines[2].trim().split(/\s+/g).map(Number);

    function findWinner(nums) {
      const stat = {};
      for (let num of nums) {
        if (!stat[num]) stat[num] = 0;
        stat[num]++;
      }

      let winNum = Infinity;
      for (let num in stat) {
        if (stat[num] === 1) winNum = Math.min(num, winNum);
      }

      if (winNum === Infinity) return null;
      return [winNum, nums.indexOf(winNum)];
    }

    function countLowerPlayers(scores) {
      const target = scores[scores.length - 1];
      let count = 0;
      for (let score of scores) {
        if (score < target) count++;
      }
      return count;
    }

    function addVariant(x) {
      variants.push(x);
      const newScores = [...scores];
      const winner = findWinner([...nums, x]);
      if (winner) {
        const [num, ind] = winner;
        newScores[ind] += num;
      }
      results.push(countLowerPlayers(newScores));
    }

    const results = [];
    const variants = [];
    const maxNum = Math.max(...nums, ...scores);

    for (let i = 1; i <= maxNum + 1; i++) {
      addVariant(i);
    }

    const result = Math.max(...results);
    const minNum = variants
      .filter((num, i) => results[i] === result)
      .sort((a, b) => a - b)[0];

    console.log(minNum);
  });
