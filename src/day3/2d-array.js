const fillRow = (width, existingRow = []) => {
  const arrayToAppend = [...Array(width - existingRow.length)].fill({ count: 0, ids: [] });

  return [...existingRow, ...arrayToAppend];
};

export class TwoDimensionalArray {
  constructor(width, height) {
    const row = [...Array(width)].fill({ count: 0, ids: [] });

    this._matrix = [...Array(height)].map(() => [...row]);
    this._intactClaims = {};
  }

  incrementTo(width, height) {
    const existingColumnsLength = this._matrix.length;
    const newRow = [...Array(width)].fill({ count: 0, ids: [] });

    const existingRows = this._matrix.map((row) => {
      return width > row.length ? fillRow(width, row) : row;
    });
    const newRows = height > existingColumnsLength ? [...Array(height - this._matrix.length)].map(() => [...newRow]) : [];

    this._matrix = [
        ...existingRows,
        ...newRows
    ];

    return this;
  }

  inputClaim(x, y, width, height, id) {
    const rowOffset = x;
    const columnOffset = y;

    [...Array(height)].forEach((ignore, columnIndex) => {
      [...Array(width)].forEach((ignore, rowIndex) => {
        this.incrementCell(rowIndex + rowOffset, columnIndex + columnOffset, id);
      })
    });

    return this;
  }

  incrementCell(rowIndex, columnIndex, id) {
    const existing = this._matrix[columnIndex][rowIndex];

    if (!this._intactClaims.hasOwnProperty(id)) {
      this._intactClaims[id] = true;
    } else if (existing.count === 1) {
      const overlappedClaim = existing.ids[existing.ids.length - 1];
      this._intactClaims[overlappedClaim] = false;
      this._intactClaims[id] = false;
    }

    this._matrix[columnIndex][rowIndex] = {
      count: existing.count + 1,
      ids: [...existing.ids, id]
    };
  }

  get matrix() {
    return this._matrix;
  }

  get intactClaims() {
    return this._intactClaims;
  }

  logOutput() {
    this._matrix.forEach((row) => {
      const rowAsString = row.reduce((result, cell) => {
        return `${result} ${cell.count}`
      }, '');

      console.log(rowAsString);
    });
  }
}
