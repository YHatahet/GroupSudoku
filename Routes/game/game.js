const express = require("express");
const { Socket } = require("socket.io");
// const Server = require("../../server");
let app = express.Router();
const sud = require("../../src/Sudoku");
const sudoku = new sud();

// sudoku.newGame();
// let board = sudoku.getBoard();
// console.log(board);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/game.html");
});

// io.sockets.on("connection", function (socket) {
//     app.emit("GetBoard", board);
//     // app.emit("")
//     socket.on("test", (group_position) => {
//         console.log(group_position);
//     });
// });
module.exports = app;
