// const readline = require('readline').createInterface(
//   process.stdin,
//   process.stdout,
// );

// readline.on('line', (line) => {
//   const result = solution(parseInput(line));
//   console.log(result);
//   process.exit(0);
// });

// function parseInput(input) {
//   return input.split(' ').map(Number);
// }

function solution(houses) {
  const distances = new Array(houses.length).fill(0);
  let shopToLeft = houses.indexOf(2);
  let shopToRight = shopToLeft;

  for (let i = 0; i < houses.length; i++) {
    if (houses[i] === 2) {
      shopToLeft = i;
      shopToRight = Math.max(shopToRight, i);
    } else if (houses[i] === 1) {
      if (shopToRight < i) {
        shopToRight++;
        while (shopToRight < houses.length) {
          if (houses[shopToRight] === 2) break;
          shopToRight++;
        }
        if (shopToRight === houses.length) shopToRight = Infinity;
      }
      distances[i] = Math.min(Math.abs(i - shopToLeft), shopToRight - i);
    }
  }

  return Math.max(...distances);
}

// const test1 = solution([2, 0, 1, 1, 0, 1, 0, 2, 1, 2]);
// console.log(test1, test1 === 3);

// const test2 = solution([2, 0, 1, 1, 0, 1, 0, 2, 1, 2, 1]);
// console.log(test2, test2 === 3);

// const test3 = solution([2, 0, 1, 1, 0, 1, 0, 1, 1, 1]);
// console.log(test3, test3 === 9);

const test4 = solution([1, 0, 1, 1, 0, 1, 0, 1, 1, 2]);
console.log(test4, test4 === 9);
