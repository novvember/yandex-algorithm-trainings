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
  const votes = [];

  for (let i = 0; i < input.length; i++) {
    const words = input[i].split(' ');
    const num = Number(words.pop());
    votes.push([words.join(' '), num]);
  }

  return votes;
}

function solution(votes) {
  function findSumChairs(parties) {
    return parties.reduce((sum, party) => sum + party.chairs, 0);
  }
  function findSumVotes(parties) {
    return parties.reduce((sum, party) => sum + party.votes, 0);
  }

  const parties = [];

  for (let i = 0; i < votes.length; i++) {
    const [title, num] = votes[i];

    parties.push({
      title: title,
      votes: num,
      order: i,
    });
  }

  const devider = findSumVotes(parties) / 450;

  for (let party of parties) {
    party.chairs = Math.floor(party.votes / devider);
    party.devidingRest = party.votes % devider;
  }

  parties.sort((a, b) => {
    if (a.devidingRest === b.devidingRest) return b.votes - a.votes;
    return b.devidingRest - a.devidingRest;
  });

  let restChairs = 450 - findSumChairs(parties);
  let currentParty = 0;

  while (restChairs > 0) {
    parties[currentParty].chairs++;
    restChairs--;
    currentParty = (currentParty + 1) % parties.length;
  }

  return parties
    .sort((a, b) => a.order - b.order)
    .map((party) => party.title + ' ' + party.chairs)
    .join('\n');
}
