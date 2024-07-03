const path = require("path");

const express = require("express");

const app = express();

app.use(express.static('public'))

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

app.get("/about", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "about.html");
  res.sendFile(htmlFilePath);
});

app.get("/game", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "game.html");
  res.sendFile(htmlFilePath);
});

app.get("/mode", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "mode.html");
  res.sendFile(htmlFilePath);
});

app.get("/settings", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "settings.html");
  res.sendFile(htmlFilePath);
});

app.listen(3011);
