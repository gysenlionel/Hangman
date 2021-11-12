const express = require("express");
const app = express();
const words = require("./public/data/words.json");

app.get("/public/data/words", (req, res) => {
  res.status(200).json(words);
});

app.listen(8080, () => {
  console.log("serveur à l'écoute");
});
