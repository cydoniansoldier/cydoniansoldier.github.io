const bodyParser = require("body-parser");
var express = require("express");
var app = express();
var PORT = 8081;

var choice1 = 0;
var choice2 = 0;
var prob1 = 0;
var prob2 = 0;
var k = 30;

const { readFileSync } = require("fs");
const fs = require("fs");
const file = require("./public/stats.json");

app.use(express.static("public"));
app.use(bodyParser.text());
app.use(express.json());

app.post("/", function (req, res) {
  if (req.is("application/json")) {
  }
  if (req.is("text/plain") && req.body == "random") {
    const dataJSON = readFileSync("./public/stats.json", "utf8");
    const data = JSON.parse(dataJSON);

    let p1 = Math.floor(Math.random() * data.episodes.length);
    let p2 = 0;

    do p2 = Math.floor(Math.random() * data.episodes.length);
    while (p2 == p1);

    choice1 = data.episodes[p1];
    choice2 = data.episodes[p2];
    const result = { choice1, choice2 };

    prob1 = 1 / (1 + Math.pow(10, (choice2.elo - choice1.elo) / 400));
    prob2 = 1 / (1 + Math.pow(10, (choice1.elo - choice2.elo) / 400));

    res.send(result);
  } else if (req.is("text/plain") && req.body == "img1") {
    elo(choice1, choice2, prob1, prob2);
    res.send("end");
  } else if (req.is("text/plain") && req.body == "img2") {
    elo(choice2, choice1, prob2, prob1);
    res.send("end");
  }
  res.end();
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

function elo(winner, loser, prob_win, prob_lose) {
  let rate_win = parseFloat(winner.elo + k * (1 - prob_win)).toFixed(1);
  winner.elo = rate_win;
  let rate_lose = parseFloat(loser.elo + k * (0 - prob_lose)).toFixed(1);
  loser.elo = rate_lose;

  const dataJSON = readFileSync("./public/stats.json", "utf8");
  const episodes = JSON.parse(dataJSON);
  for (ep of episodes.episodes) {
    if (ep.no == winner.no) {
      ep.elo = parseFloat(winner.elo);
    } else if (ep.no == loser.no) {
      ep.elo = parseFloat(loser.elo);
    }
  }
  console.log(episodes);
  fs.writeFileSync(
    "./public/stats.json",
    JSON.stringify(episodes, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
}
