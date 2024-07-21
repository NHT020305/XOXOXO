const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "diary.json");


function getStoredDiaries() {

  const fileData = fs.readFileSync(filePath);
  const storedDiaries = JSON.parse(fileData);

  return storedDiaries;
}


function storeDiaries(storableDiaries) {
  fs.writeFileSync(filePath, JSON.stringify(storableDiaries));
}


module.exports = {
  getStoredDiaries: getStoredDiaries,
  storeDiaries: storeDiaries
}
