import Toolkit from '@/core/toolkit';
const levelORNumber = {

}
export default class Generator {
  matrix: number[][];
  level: number;
  constructor(level) {
    this.matrix = Toolkit.matrix.makeMatrix(level);
    this.level = level;
  }
  make() {
    for (let i = 0; i < 40; i++) {
      this.fillNumber();
    }
    this.addNumber();
    return this.matrix;
  }
  fillNumber() {
    const orders = this.randomIndex(this.level);
    if (this.matrix[orders.rowIndex][orders.colIndex] === 9) {
      this.fillNumber()
    } else {
      this.matrix[orders.rowIndex][orders.colIndex] = 9;
    }
  }
  addNumber() {
    this.matrix.map((r, rowIndex) => r.map((c, colIndex) => {
      if (c === 9) {
        const box = Toolkit.box.getBoxCells(rowIndex, colIndex, this.level);
        box.forEach(v => {
          if (this.matrix[v.rowIndex][v.colIndex] !== 9) {
            ++this.matrix[v.rowIndex][v.colIndex];
          }
        })
      }
    }))
  }
  randomIndex(level) {
    return {
      rowIndex: ~~(Math.random() * (level - 1)),
      colIndex: ~~(Math.random() * (level - 1))
    }
  }
}