"use strict";

const SudokuTools = require("sudoku");

class Sudoku {
  constructor() {
    this._sudokuBoardStart;
    this._sudokuBoardCurrent;
    this._sudokuBoardSolution;
  }

  /**
   *
   * @returns Current sudoku board
   */
  getBoard() {
    return this._sudokuBoardCurrent;
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
   * Creates a sudoku game
   * @param {Number} difficulty
   */
  createSudoku(difficulty) {
    this._sudokuBoardSolution = this._generateSudokuBoard();
    this._sudokuBoardCurrent = [...this._sudokuBoardSolution];
    this._hideBlocksRandomly(this._sudokuBoardCurrent, difficulty);
    this._sudokuBoardStart = [...this._sudokuBoardCurrent];
  }

  /**
   * Restarts the exact same board as the one we started with
   */
  restart() {
    this._sudokuBoardCurrent = [...this._sudokuBoardStart];
  }

  /**
   * Reservoir sampling function; returns k elements between 0 and 80
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
   * hides random blocks by utilizing reservoir sampling
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
   * Gets index for sudoku boards
   * @param {Number} x row index <0 - 8>
   * @param {Number} y column index <0 - 8>
   * @returns
   */
  _getIndex(x, y) {
    return x + y * 9;
  }

  /**
   * Checks if the value at the given position is correct
   * @param {Number} value Number (<1 to 9>)
   * @param {Number} x row position (<1 to 9>)
   * @param {Number} y column position (<1 to 9>)
   * @returns {Boolean} True or False
   */
  check(value, x, y) {
    return value === this._sudokuBoardSolution[_getIndex(x, y)];
  }
}

module.exports = Sudoku;
