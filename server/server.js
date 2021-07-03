// //Use express module and choose the html file
// const express = require("express");
// const app = express();
// const game = require("./Routes/game/game");
// const login = require("./Routes/router");

// class Server {
//     /**
//      *
//      * @param {number} port set the server's port
//      */
//     constructor(port) {
//         this.port = this.port || 8000;
//     }
//     /**
//      * initialize and start the server
//      */
//     init() {
//         app.use("/", login);
//         app.use("/game", game);

//         app.listen(this.port, function () {
//             console.log("Listening to Port 8000");
//         });
//     }
// }
// module.exports = Server;
// // module.exports = io;

// const io = require("socket.io")();
// const { createGameState } = require("/game");
// const { FRAME_RATE } = requre("./constants");
