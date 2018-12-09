import { input } from './input';
// const input =
// `1, 1
// 1, 6
// 8, 3
// 3, 4
// 5, 5
// 8, 9`;

const parsedInput = input.split('\n')
    .map((line, id) => {
      const [ignore, x, y] = line.match(/^(\d+), (\d+)$/).map(Number);

      return { id, x, y };
    });

const minX = [...parsedInput].sort((a, b) => a.x - b.x)[0].x;
const maxX = [...parsedInput].sort((a, b) => b.x - a.x)[0].x;
const minY = [...parsedInput].sort((a, b) => a.y - b.y)[0].y;
const maxY = [...parsedInput].sort((a, b) => b.y - a.y)[0].y;

console.log({ minX, maxX, minY, maxY });

const getDistance = (from, to) => {
  return Math.abs(from.x - to.y) + Math.abs(from.y - to.x);
};

const findClosest = (x, y) => {

  const ordered = parsedInput.map((pi) => {
    return { ...pi, distance: getDistance({ x, y }, pi) };
  })
    .sort((a, b) => {
      return a.distance - b.distance;
    });

  const [ first, ...rest] = ordered;
  const moreThanOne = rest.some((a) => {
    return a.distance === first.distance;
  });

  return moreThanOne ? '.' : first.id;
};

const matrix = [...Array(maxY + 1)].reduce((columns, ignore, x) => {
  const newColumn = [...Array(maxX + 1)].reduce((row, ignore, y) => {
    return row.concat(findClosest(x, y));
  }, []);

  return columns.concat([newColumn]);
}, []);

const infiniteIds = matrix.reduce((acc, row, x) => {
  const ids = row.filter((id, y) => {
    return x === 0 || x === maxX + 1 || y === 0 || y === maxY + 1
  });
  return [
      ...acc,
      ...ids
  ]
}, []);

matrix.forEach((row) => {
  const rowStr = row.reduce((s, val) => {
    return `${s} ${val}`;
  }, '');
});

const flattened = matrix.reduce((acc, row) => {
  return [
      ...acc,
      ...row
  ]
}, []);

const finiteIds = flattened.filter((id) => {
    return infiniteIds.indexOf(id) === -1;
});

const result = Object.values(finiteIds.reduce((acc, id) => {
  const idAndCount = acc[id] || { id, count: 0 };

  idAndCount.count += 1;
  acc[id] = idAndCount;

  return acc;
}, {}))
    .sort((a, b) => {
      return b.count - a.count;
    })[0].count;

console.log({result});

