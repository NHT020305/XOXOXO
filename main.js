const fs = require("fs");
const path = require("path");


const express = require("express");


const uuid = require('uuid')


const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));


app.get("/", function (req, res) {
  res.render("index");
});


app.get("/about", function (req, res) {
  res.render("about");
});


app.get("/game", function (req, res) {
  res.render("game");
});


app.get("/explore/:id", function(req, res) {

  const invitedPlayerId = req.params.id;

  const filePath = path.join(__dirname, "data", "diary.json");
  const fileData = fs.readFileSync(filePath);
  const storedDiaries = JSON.parse(fileData);

  for (const diary of storedDiaries) {
    if (diary.pid === invitedPlayerId ) {
      return res.render('invited-player', { diary: diary});
    }
  }

  res.render('404')
})


app.get("/explore", function (req, res) {
  
  const filePath = path.join(__dirname, "data", "diary.json");
  const fileData = fs.readFileSync(filePath);
  const storedDiaries = JSON.parse(fileData);

  res.render("explore", {
    numberOfMatches: storedDiaries.length,
    diaries: storedDiaries,
  });
});


app.get("/connect", function (req, res) {
  res.render("connect");
});


app.post("/connect", function (req, res) {

  const diary = req.body;
  diary.pid = uuid.v4(); // generating random ID but unique

  const filePath = path.join(__dirname, "data", "diary.json");
  const fileData = fs.readFileSync(filePath);
  const storedDiaries = JSON.parse(fileData);
  storedDiaries.push(diary);

  fs.writeFileSync(filePath, JSON.stringify(storedDiaries));

  res.redirect("/confirm");
});


app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.use(function(req, res) {
  res.render('404');
})

app.listen(3000);
