import { getInputNumbers } from './input';

const getFrequencyChange = () => getInputNumbers()
    .reduce((result, number) => result + number, 0);

const result = getFrequencyChange();

console.log({result});

