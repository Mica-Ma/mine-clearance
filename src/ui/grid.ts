import Mine from '@/core';
import Toolkit from '@/core/toolkit';
import $ from "jquery";
let matrix: number[][];
let markMatrix: number[][];
class Grid {
  $container: JQuery<HTMLElement>;
  $cellArray: JQuery<HTMLElement>[][];
  level: number;
  constructor(container) {
    this.$container = container;
    this.$cellArray = [];
    this.level = 16;
  }
  build(level = 16) {
    matrix = new Mine().make(level);
    markMatrix = JSON.parse(JSON.stringify(matrix));
    this.level = level;
    const $cell = this.$cellArray = matrix.map((rowValue, rowIndex) => rowValue.map((cellValue, colIndex) => {
      return $('<li>')
        .addClass('col')
        .attr('data-row', rowIndex)
        .attr('data-col', colIndex)
    }))
    const $row = $cell.map($cellArray => {
      return $('<ul>')
        .addClass('row')
        .append($cellArray)
    })
    this.$container.append($row);
    this.bindEvent();
  }
  bindEvent() {
    // 右击事件绑定
    $('body').bind('contextmenu', e => {
      e.preventDefault();
      const el = e.target;
      if (el.tagName === 'LI') {
        if ($(el).hasClass('mark')) {
          $(el).removeClass('mark');
        } else {
          $(el).addClass('mark');
        }
      }
    });
    // 单元格点击
    this.$container.on('click', '.col', e => {
      const el = e.target;
      const rowIndex = $(el).data('row');
      const colIndex = $(el).data('col');
      this.open(rowIndex, colIndex);

      // console.log(markMatrix);
      // if (markMatrix.toString().split(',').every(val => val === '9' || val === '-1')) {
      //   matrix.forEach((rowValue, rowIndex) => rowValue.map((colValue, colIndex) => {
      //     const fun = () => {
      //       this.$cellArray[rowIndex][colIndex]
      //         .empty()
      //         .removeClass('boom')
      //         .removeClass('open')
      //         .removeClass('mark')
      //         .addClass(`num-${colValue}`)
      //     }
      //     setTimeout(fun, 20);
      //   }))
      // }
      
      // var all = document.querySelectorAll('.col')
      // var allNum = 0
      // var stop = setInterval(function () {
      //   var r = Math.floor(Math.random() * 256)
      //   var g = Math.floor(Math.random() * 256)
      //   var b = 210
      //   // var b = Math.floor(Math.random() * 256)
      //   all[allNum].style.background = `rgba(${r},${g},${b},0.6)`
      //   allNum++
      //   if (allNum === all.length) {
      //     clearInterval(stop)
      //   }
      // }, 20)
    })
  }
  open(rowIndex, colIndex) {
    const currentNum = matrix[rowIndex][colIndex];
    switch (currentNum) {
      case 9:
        matrix.forEach((rowValue, rowIndex) => rowValue.map((colValue, colIndex) => {
          if (colValue === 9) {
            this.$cellArray[rowIndex][colIndex]
              .addClass('open')
              .addClass('boom');
          }
        }))
        break;
      
      case 0:
        this.$cellArray[rowIndex][colIndex].addClass('open');
        markMatrix[rowIndex][colIndex] = -1;
        const box = Toolkit.box.getBoxcCloseCells(rowIndex, colIndex, this.level);
        box.forEach(v => {
          setTimeout(() => {
            if (!this.$cellArray[v.rowIndex][v.colIndex].hasClass('open'))
              this.open(v.rowIndex, v.colIndex);
          }, 10);
        });
        break;
      default:
        this.$cellArray[rowIndex][colIndex]
          .addClass('open')
          .text(currentNum);
        markMatrix[rowIndex][colIndex] = -1;
        break;
    }
  }
  reset() {}
  ckeck() {}
  rebuild(level = 9) {
    this.$container.empty();
    this.build(level);
  }
}

export default Grid;
