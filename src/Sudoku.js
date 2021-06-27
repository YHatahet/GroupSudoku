"use strict";

const SudokuTools = require("sudoku");

class Sudoku {
  /**
   * Preliminary API:
   *
   * - createSudoku(difficulty)
   * - newGame()
   * - restart() // same game but clean
   * - check (number<1to9>, x, y) -> Boolean
   *
   */

  constructor() {
    this.sudokuBoard;
    this.sudokuBoardSolution;
  }

  /**
   *
   * Generates a new sudoku board
   */
  _generateSudoku() {
    return SudokuTools.solvepuzzle(SudokuTools.makepuzzle());
  }

  /**
   *
   * @param {Number} difficulty
   */
  createSudoku(difficulty) {
    this.sudokuBoardSolution = this._generateSudoku();
    this.sudokuBoard = [...this.sudokuBoardSolution];
    this._hideBlocksRandomly(difficulty);
  }

  /**
   *
   * @param {*} k
   * @returns {Array}
   */
  _reservoirSampling(k) {
    let i;
    const numElements = 81; // sudoku has 9*9 elements
    const stream = Array.from(Array(numElements).keys());
    const reservoir = [];
    for (i = 0; i < k; i++) reservoir[i] = stream[i];

    for (; i < numElements; i++) {
      let j = Math.floor(Math.random() * 100000000) % (i + 1);

      // If the randomly picked index is smaller than k, then replace the element present at the index with new element from stream
      if (j < k) reservoir[j] = stream[i];
    }
    return reservoir;
  }

  _hideBlocksRandomly(blocksAmount) {
    const numsToBlock = this._reservoirSampling(81 - blocksAmount);
    for (const index of numsToBlock) {
      this.sudokuBoard[index] = null;
    }
  }

  /**
   * Checks if the value at the given position is correct
   * @param {Number} value Number (<1 to 9>)
   * @param {Number} x row position (<1 to 9>)
   * @param {Number} y column position (<1 to 9>)
   * @returns {Boolean} True or False
   */
  check(value, x, y) {
    const index = x + y * 9;
    return value === this.sudokuBoardSolution[index];
  }
}

module.exports = Sudoku;
