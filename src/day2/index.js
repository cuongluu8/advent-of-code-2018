import { getInput } from './input';

const getCounts = (chars) =>
    chars.reduce((result, char) =>
        ({ ...result, ...{ [char]: (result[char] || 0) + 1 } }), {});


const hasTwice = (counts) => counts.some((count) => count === 2);
const hasThrice = (counts) => counts.some((count) => count === 3);

const results = getInput()
  .reduce((result, boxId) => {
      const counts = Object.values(getCounts(boxId.split('')));

      return {
        twice: hasTwice(counts) ? result.twice + 1 : result.twice,
        thrice: hasThrice(counts) ? result.thrice + 1 : result.thrice
      }
  }, { twice: 0, thrice: 0 });

console.log({results});

const checksome = results.twice * results.thrice;

console.log({checksome});
