import { getInput } from './input';

const isEqual = (id1, id2) => {
    if (id1.length === id2.length) {
        const differences = id1.reduce((count, char, index) => {
            return char === id2[index] ? count : count + 1
        }, 0);

      return differences <= 1;
    }

    return false;
};

const removeDifferingChar = (id1, id2) => {
    return id1.reduce((result, char, index) => {
      return char === id2[index] ? [...result, char] : result
    }, []);
};

const boxIds = getInput();

let matchingBoxId = null;
let newBoxId = [...boxIds];

while(!matchingBoxId) {
  const [boxId, ...restOfBoxIds] = newBoxId;

  matchingBoxId = restOfBoxIds.find((element) => isEqual(element.split(''), boxId.split('')));

  console.log({boxId});

  if (matchingBoxId) {
    console.log({matchingBoxId});
    const result = removeDifferingChar(boxId.split(''), matchingBoxId.split('')).join('');

    console.log({result});
  }

  newBoxId = [...restOfBoxIds];
}



