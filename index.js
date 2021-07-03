var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const game = require("./Routes/game/game");
const login = require("./Routes/router");
let mistakescount = 0;
const { FRAME_RATE } = require("./server/constants");

// const express = require("express");
// const { Socket } = require("socket.io");
// const Server = require("../../server");
// let app = express.Router();
const sud = require("./src/Sudoku");
const sudoku = new sud();

sudoku.newGame(23);
let sudoku_sol = sudoku.solutionBoard();
let board = sudoku.getBoard();
let startboard = sudoku.startBoard();
let currentboard = startboard;
// Use the following folders
app.use("/", game);
// app.use("/game", game);

const port = 4141;

io.on("connection", function (socket) {
    console.log("A user connected", socket.id);
    console.log(currentboard);
    //Send a message after a timeout of 4seconds
    setTimeout(function () {
        socket.send("Sent a message 4seconds after connection!");
    }, 4000);
    socket.on("testing", (data, roomid) => {
        console.log(data, roomid);
    });
    socket.on("disconnect", function () {
        console.log("A user disconnected");
    });

    setInterval(function () {
        socket.emit("getboard", currentboard);
    }, 1000);
    socket.emit("getboard", currentboard);

    setInterval(function () {
        for (let j; j <= 81; j++) {
            if (currentboard[j] != sudoku_sol[j]) {
                mistakescount++;
                socket.emit("mistake", j, mistakescount);
            } else {
                socket.emit("correct", j);
            }
        }
        socket.emit("getboard", currentboard);
    }, 3000);

    socket.on("updatesudoku", (randomval, key) => {
        console.log(randomval, key);
        currentboard[key] = randomval;
        if (currentboard[key] != sudoku_sol[key]) {
            mistakescount++;
            socket.emit("mistake", key, mistakescount);
        } else {
            socket.emit("correct", key);
        }
    });
});
http.listen(port, function () {
    console.log("listening on :" + port);
});
