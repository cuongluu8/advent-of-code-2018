import { getInput } from './input';
import { TwoDimensionalArray } from './2d-array';

const input = getInput();
const input2 = [
  { x: 1, y:3, width: 4, height: 4, id: '#1' },
  { x: 3, y:1, width: 4, height: 4, id: '#2' },
  { x: 5, y:5, width: 2, height: 2, id: '#3' },
];

const matrix = new TwoDimensionalArray(1, 1);

input.forEach((claim) => {
  const { x, y, width, height, id } = claim;

  matrix
    .incrementTo(x + width, y + height)
    .inputClaim(x, y, width, height, id);
});

// matrix.logOutput();

const result = matrix.matrix.reduce((count, row) => {
  return count + row.reduce((rowCount, cell) => {
    return rowCount + (cell.count > 1 ? 1 : 0);
  }, 0)
}, 0);

console.log({result});

const resultPart2 = Object.keys(matrix.intactClaims).find((claimId) => {
  return matrix.intactClaims[claimId];
});

console.log({resultPart2});
