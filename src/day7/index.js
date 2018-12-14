import { getInput } from './input';

const parseDetails = (details) => {
  const [ ignore, beforeStep, step ] = details.match(/^Step (.*) must be finished before step (.*) can begin.$/);
  return {
    beforeStep, step
  };
};

const instructions = getInput().map((input) => parseDetails(input));

const insertBefore = (order, step, before) => {
  const index = order.indexOf(before);

  return [
    ...order.slice(0, index),
    step,
    ...order.slice(index)
  ];
};

const sortAlphabetically = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0;
const unique = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.lastIndexOf(elem) == pos;
  });
};

const instructionsMap = instructions.reduce((map, instruction) => {
  const { beforeStep, step } = instruction;

  const nextSteps = map[beforeStep] || [];

  return {
      ...map,
    [ beforeStep ]: [ ...nextSteps, step ].sort(sortAlphabetically)
  };
}, {});

// Object.keys(instructionsMap).forEach((step) => {
//   console.log(`${step}: ${instructionsMap[step].join(',')}`);
// });

const allValues = Object.values(instructionsMap).reduce((allValues, values) => allValues.concat(values), []);
let nextSteps = Object.keys(instructionsMap).filter((a) => {
  return !allValues.some((step) => step === a);
});

let result = '';
while (nextSteps.length > 0) {
  const [nextStep, ...restOfTheSteps] = nextSteps.sort(sortAlphabetically);
  const nextStepsInInstructions = instructionsMap[nextStep] || [];

  nextSteps = unique([...nextStepsInInstructions, ...restOfTheSteps]).sort(sortAlphabetically);

  result = `${result}${nextStep}`;
}

console.log(unique(result.split('')).join(''));

