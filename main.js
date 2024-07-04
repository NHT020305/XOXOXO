const fs = require('fs')
const path = require("path");

const express = require("express");

const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}));

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

app.get("/connect", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "connect.html");
  res.sendFile(htmlFilePath);
});

app.post('/connect', function(req, res) {

  const diary = req.body;
  
  const filePath = path.join(__dirname, 'data', 'diary.json');
  const fileData = fs.readFileSync(filePath);
  const existingDiaries = JSON.parse(fileData);
  existingDiaries.push(diary);

  fs.writeFileSync(filePath, JSON.stringify(existingDiaries))

  res.redirect('/confirm');
})

app.get("/confirm", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(htmlFilePath);
});

app.listen(3000);
