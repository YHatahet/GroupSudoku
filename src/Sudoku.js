"use strict";

const SudokuTools = require("sudoku");

class Sudoku {
  constructor() {
    this.sudokuBoardStart;
    this.sudokuBoardCurrent;
    this.sudokuBoardSolution;
  }

  /**
   *
   * Generates a new sudoku board
   */
  _generateSudokuBoard() {
    return SudokuTools.solvepuzzle(SudokuTools.makepuzzle());
  }

  /**
   * Create new game
   * @param {*} difficulty number of blocks to hide
   */
  newGame(difficulty) {
    this.createSudoku(difficulty);
  }

  /**
   *
   * @param {Number} difficulty
   */
  createSudoku(difficulty) {
    this.sudokuBoardSolution = this._generateSudokuBoard();
    this.sudokuBoardCurrent = [...this.sudokuBoardSolution];
    this._hideBlocksRandomly(this.sudokuBoardCurrent, difficulty);
    this.sudokuBoardStart = [...this.sudokuBoardCurrent];
  }

  /**
   * Restarts the exact same board
   */
  restart() {
    this.sudokuBoardCurrent = [...this.sudokuBoardStart];
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

      // If the randomly picked index is smaller than k, then replace
      // the element present at the index with new element from stream
      if (j < k) reservoir[j] = stream[i];
    }
    return reservoir;
  }

  /**
   *
   * @param {*} board
   * @param {*} blocksAmount
   */
  _hideBlocksRandomly(board, blocksAmount) {
    const numsToBlock = this._reservoirSampling(81 - blocksAmount);
    for (const index of numsToBlock) {
      board[index] = null;
    }
    return board;
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
