
const makeRow = (l) => {
  return new Array(l).fill(0);
}
const matrixToolkit = {

  makeMatrix(l = 16) {
    return Array.from({ length: l }, () => makeRow(l))
  }

}

const boxToolkit = {
  getBoxCells(r, c, level = 16) {
    const startRowIndex = r - 1;
    const startColIndex = c - 1;
    const result: any[] = [];
    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const rowIndex = startRowIndex + ~~(cellIndex / 3);
      const colIndex = startColIndex + cellIndex % 3;
      if (rowIndex < 0 || colIndex < 0 || (rowIndex === r && colIndex === c) || rowIndex >= level || colIndex >= level) continue;
      result.push({ rowIndex, colIndex });
    }
    return result;
  },
  getBoxcCloseCells(r, c, level = 16) {
    const startRowIndex = r - 1;
    const startColIndex = c - 1;
    const result: any[] = [];
    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const rowIndex = startRowIndex + ~~(cellIndex / 3);
      const colIndex = startColIndex + cellIndex % 3;
      if (rowIndex < 0 || colIndex < 0 || (rowIndex === r && colIndex === c) || !(cellIndex % 2) || rowIndex >= level || colIndex >= level) continue;
      result.push({ rowIndex, colIndex });
    }
    return result;
  }
}




export default class Toolkit {

  /**
   * 矩阵工具
   * 
   * @readonly
   * @static
   * @memberof Toolkit
   */
  static get matrix() {
    return matrixToolkit
  }
  /**
   * 九宫格
   *
   * @readonly
   * @static
   * @memberof Toolkit
   */
  static get box() {
    return boxToolkit;
  }
}