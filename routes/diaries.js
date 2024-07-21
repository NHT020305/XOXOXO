const express = require("express");

const uuid = require("uuid");

//const diariesData = require("../util/diary-data");

const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

//const { ObjectId } = require('bson');

const router = express.Router();

const db = require("../data/database");

router.get("/game", function (req, res) {
  res.render("game");
});

router.get("/explore/:id", async function (req, res) {
  
  const diaryId = new ObjectId(req.params.id);

  const diary = await db
    .getDb()
    .collection("diaries")
    .findOne({ _id: diaryId });

  if (! diary) {
    return res.status(404).render("404");
  }

  res.render("invited-player", { diary: diary });
});

router.post("/explore/:id/delete", async function (req, res) {
  
  const diaryId = new ObjectId(req.params.id);

  const diary = await db
    .getDb()
    .collection("diaries")
    .deleteOne({ _id: diaryId });

  res.redirect("/explore");
});

router.get("/explore", async function (req, res) {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === "desc") {
    nextOrder = "asc";
  }

  const storedDiaries = await db.getDb().collection("diaries").find().toArray();
  //const storedDiaries = diariesData.getStoredDiaries();

  storedDiaries.sort(function (diaryA, diaryB) {
    if (
      (order === "asc" && diaryA.mainNickname > diaryB.mainNickname) ||
      (order === "desc" && diaryA.mainNickname < diaryB.mainNickname)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("explore", {
    numberOfMatches: storedDiaries.length,
    diaries: storedDiaries,
    nextOrder: nextOrder,
  });
});

router.get("/connect", async function (req, res) {
  const matchNames = await db.getDb().collection("matchNames").find().toArray();
  console.log(matchNames);
  res.render("connect", { matchNames: matchNames });
});

/*router.post("/connect", function (req, res) {

  const diary = req.body;
  diary.pid = uuid.v4(); // generating random ID but unique

  const storedDiaries = diariesData.getStoredDiaries();

  storedDiaries.push(diary);

  diariesData.storeDiaries(storedDiaries);

  res.redirect("/confirm");
});*/

router.post("/explore", async function (req, res) {

  /*const matchNameId = new ObjectId(req.params.matchName);
  const matchName = await db
    .getDb()
    .collection("matchNames")
    .findOne({ _id: matchNameId });*/

  let currentDate = new Date();
  let date = currentDate.toLocaleDateString();
  let time = currentDate.toLocaleTimeString();

  const newDiary = {
    mainNickname: req.body.mainNickname,
    opponentNickname: req.body.opponentNickname,
    matchName: req.body.matchName,
    winner: req.body.winner,
    describe: req.body.describe,
    date: date + " " + time,
    pid: uuid.v4(),
  };

  const result = await db.getDb().collection("diaries").insertOne(newDiary);
  console.log(result);
  res.redirect("/confirm");
});

/*router.post("/explore", async function (req, res) {

  const newDiary1 = {
    mainNickname: req.body.playerName,
    opponentNickname: req.body.playerName,
    matchName: 'ABCDEF',
    winner: req.body.playerName,
    describe: 'It was funny',
  }

  const result = await db.getDb().collection('diaries').insertOne(newDiary1);
  console.log(result);
  res.redirect('/confirm');

});*/

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
