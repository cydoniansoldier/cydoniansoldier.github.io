function init() {
  let response = fetch("./", {
    method: "POST",
    body: "random",
    headers: {
      "Content-type": "text/plain; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      document.getElementById("p1Num").innerHTML = json.choice1.no;
      document.getElementById("p1Title").innerHTML = json.choice1.title;
      document.getElementById("p1Elo").innerHTML = "Rank: " + json.choice1.elo;

      document.getElementById("p2Num").innerHTML = json.choice2.no;
      document.getElementById("p2Title").innerHTML = json.choice2.title;
      document.getElementById("p2Elo").innerHTML = "Rank: " + json.choice2.elo;

      let prob1 =
        1 / (1 + Math.pow(10, (json.choice2.elo - json.choice1.elo) / 400));
      let prob2 =
        1 / (1 + Math.pow(10, (json.choice1.elo - json.choice2.elo) / 400));
    });
}

function chosen(sth) {
  let response = fetch("./", {
    method: "POST",
    body: sth.querySelector("div").id,
    headers: {
      "Content-type": "text/plain; charset=UTF-8",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      if (data == "end") {
        init();
      }
    });
}
init();
