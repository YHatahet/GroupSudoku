const express = require("express");
// let path = require('path');
let app = express.Router();
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/login/login.html');
});
app.get('/game', function (req, res) {
  res.sendFile(__dirname + '/game/game.html');
  // res.sendFile('game.html', {root: path.join(__dirname, '/game') });
});
module.exports = app;
