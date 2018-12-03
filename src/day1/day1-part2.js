const { getInputNumbers } = require('./input');

const frequencies = [];

const getFrequencyRepeat = (frequency) => getInputNumbers()
  .reduce((result, number) => {
    if (result.foundRepeat) {
      return result;
    } else {
      const acc = result.accumalator + number;
      const foundRepeat = frequencies.indexOf(acc) >= 0;

      if (!foundRepeat) {
        frequencies.push(acc);
      }

      return {
        accumalator: acc,
        foundRepeat,
        repeatedFrequency: foundRepeat ? acc : null
      };
    }


  }, { accumalator: frequency, foundRepeat: false, repeatedFrequency: null });

let currentFrequency = 0;
let result = null;

do {
  console.log({currentFrequency});
  result = getFrequencyRepeat(currentFrequency);
  currentFrequency = result.accumalator;

} while (!result.foundRepeat);

console.log({result});
