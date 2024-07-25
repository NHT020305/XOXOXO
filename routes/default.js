const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/game", function (req, res) {
  res.render("game");
});

router.get("/update-diary", function (req, res) {
  res.render("update-diary");
});

module.exports = router