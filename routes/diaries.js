const express = require("express");

const multer = require("multer");

const storageConfiguration = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "imageStorage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfiguration });

//const uuid = require("uuid");
//const diariesData = require("../util/diary-data");

const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

const router = express.Router();

const db = require("../data/database");


router.get("/explore/:id", async function (req, res) {
  
  let diaryId = req.params.id;

  try {
    diaryId = new ObjectId(diaryId);
  } catch (error) {
    return res.status(404).render("404");
  }

  const diary = await db
    .getDb()
    .collection("diaries")
    .findOne({ _id: diaryId });

  if (!diary) {
    return res.status(404).render("404");
  }

  const comments = await db
    .getDb()
    .collection("comments")
    .find({ diaryId: diaryId })
    .toArray();

  res.render("invited-player", { diary: diary, comments: comments });
});


router.get("/explore/:id/edit", async function (req, res) {
  
  const diaryId = req.params.id;

  const diary = await db
    .getDb()
    .collection("diaries")
    .findOne({ _id: new ObjectId(diaryId) }, { matchName: 1, describe: 1 });

  if (!diary) {
    return res.status(404).render("404");
  }

  res.render("update-diary", { diary: diary });
});


router.post("/explore/:id/edit", async function (req, res) {
  
  const diaryId = new ObjectId(req.params.id);

  let currentDate = new Date();
  /*let date = currentDate.toLocaleDateString();
  let time = currentDate.toLocaleTimeString();*/

  const result = await db
    .getDb()
    .collection("diaries")
    .updateOne(
      { _id: diaryId },
      {
        $set: {
          matchName: req.body.matchName,
          describe: req.body.describe,
          date: currentDate,
        },
      }
    );

  res.redirect("/explore/" + req.params.id);
});


router.post("/explore/:id/delete", async function (req, res) {
  const diaryId = new ObjectId(req.params.id);

  const diary = await db
    .getDb()
    .collection("diaries")
    .deleteOne({ _id: diaryId });

  const comment = await db
    .getDb()
    .collection("comments")
    .deleteMany({ diaryId: diaryId });

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
      (order === "asc" && diaryA.date > diaryB.date) ||
      (order === "desc" && diaryA.date < diaryB.date)
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


router.post("/explore", upload.single("fileUpload"), async function (req, res) {
  
  /*const matchNameId = new ObjectId(req.params.matchName);
  const matchName = await db
    .getDb()
    .collection("matchNames")
    .findOne({ _id: matchNameId });*/

  const uploadedImage = req.file;

  let currentDate = new Date();
  /*let date = currentDate.toLocaleDateString();
  time = currentDate.toLocaleTimeString();*/

  const newDiary = {
    mainNickname: req.body.mainNickname,
    opponentNickname: req.body.opponentNickname,
    matchName: req.body.matchName,
    winner: req.body.winner,
    describe: req.body.describe,
    imagePath: uploadedImage.path,
    date: currentDate //date + " " + time,
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


router.get("/explore/:id/comment", async function (req, res) {
  
  const diaryId = new ObjectId(req.params.id);
  const diary = await db
    .getDb()
    .collection("diaries")
    .findOne({ _id: diaryId });

  const comments = await db
    .getDb()
    .collection("comments")
    .find({ diaryId: diaryId })
    .toArray();

  res.render("diary-comments", { diary: diary, comments: comments });
});


router.post("/explore/:id/comment", async function (req, res) {
  
  const diaryId = new ObjectId(req.params.id);

  const comment = {
    diaryId: diaryId,
    title: req.body.commentTitle,
    content: req.body.commentContent,
  };

  await db.getDb().collection("comments").insertOne(comment);

  res.redirect("/explore/" + req.params.id);
});


router.get("/explore/:id1/comment/:id2/delete", async function (req, res) {
  
  const diaryId = new ObjectId(req.params.id1);
  
  const commentId = new ObjectId(req.params.id2);

  const comment = await db
    .getDb()
    .collection("comments")
    .findOne({ diaryId: diaryId, _id: commentId });

  res.render("invited-player", { comment: comment });
});


router.post("/explore/:id1/comment/:id2/delete", async function (req, res) {
  
  const diaryId = new ObjectId(req.params.id1);
  
  const commentId = new ObjectId(req.params.id2);

  const comment = await db
    .getDb()
    .collection("comments")
    .deleteOne({ diaryId: diaryId, _id: commentId })

  res.redirect("/explore/" + req.params.id1);
});


module.exports = router;
