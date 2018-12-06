import { input } from './input';

const doReactions = (i) => {
  let done = false;
  let output = i;

  while (!done) {
    const newOutput = output.replace(/(aA)|(Aa)|(bB)|(Bb)|(cC)|(Cc)|(dD)|(Dd)|(eE)|(Ee)|(fF)|(Ff)|(gG)|(Gg)|(hH)|(Hh)|(iI)|(Ii)|(jJ)|(Jj)|(kK)|(Kk)|(lL)|(Ll)|(mM)|(Mm)|(nN)|(Nn)|(oO)|(Oo)|(pP)|(Pp)|(qQ)|(Qq)|(rR)|(Rr)|(sS)|(Ss)|(tT)|(Tt)|(uU)|(Uu)|(vV)|(Vv)|(wW)|(Ww)|(xX)|(Xx)|(yY)|(Yy)|(zZ)|(Zz)/g,'');

    if (newOutput !== output) {
      output = newOutput;
    } else {
      done = true;
    }
  }

  return output;
};

// const output = doReactions(input);
// console.log(input.length);
// console.log(output.length);

// PART 2

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const orderedPolymars = alphabet.split('').map((letter) => {
  const regexStr = `(${letter})|(${letter.toUpperCase()})`;
  const regEx = new RegExp(regexStr, 'g');

  const inputWithRemovedUnit = input.replace(regEx, '');

  return {
    polymar: doReactions(inputWithRemovedUnit)
  }
})
    .sort((a, b) => a.polymar.length - b.polymar.length);

const result = orderedPolymars[0].polymar.length;
const result2 = orderedPolymars[1].polymar.length;
const result3 = orderedPolymars[2].polymar.length;

console.log({result});
console.log({result2});
console.log({result3});
