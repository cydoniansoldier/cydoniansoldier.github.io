// const fs = require("fs");

fetch('stats.json')
.then( response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then( json => init(json) )
  .catch( err => console.error(`Fetch problem: ${err.message}`) );

var k=30;
var episodesJSON;
var p1=0;
var p2=0;
var prob1=0;
var prob2=0;

function init(episodes){
    episodesJSON = episodes;
    losulosu();
}
function losulosu(){
    
    p1 = Math.floor(Math.random() * episodesJSON.episodes.length);
    document.getElementById("p1Num").innerHTML = episodesJSON.episodes[p1].no;
    document.getElementById("p1Title").innerHTML = episodesJSON.episodes[p1].title;
    document.getElementById("p1Elo").innerHTML = "Rank: " + episodesJSON.episodes[p1].elo;

    p2 = 0;
    do
        p2 = Math.floor(Math.random() * episodesJSON.episodes.length);
    while (p2 == p1)

    document.getElementById("p2Num").innerHTML = episodesJSON.episodes[p2].no;
    document.getElementById("p2Title").innerHTML = episodesJSON.episodes[p2].title;
    document.getElementById("p2Elo").innerHTML = "Rank: " + episodesJSON.episodes[p2].elo;

    prob1 = (1 / (1 + Math.pow(10, ((episodesJSON.episodes[p2].elo-episodesJSON.episodes[p1].elo) / 400 ))));
    // console.log(prob1);
    prob2 = (1 / (1 + Math.pow(10, ((episodesJSON.episodes[p1].elo-episodesJSON.episodes[p2].elo) / 400 ))));
    // console.log(prob2);
}

function chosen(sth){
    let id = sth.querySelector("div").id;
    
    //console.log(episodesJSON);
    if (id == "img1"){
        elo(episodesJSON.episodes[p1], episodesJSON.episodes[p2], prob1, prob2);
    }
    else if (id == "img2"){
        elo(episodesJSON.episodes[p2], episodesJSON.episodes[p1], prob2, prob1);
    }
    else{
        alert("Wyvislt zl qlza, d tvykę qlżh.");
    }
}

function elo(winner, loser, prob_win, prob_lose){
    let rate_win = parseFloat((winner.elo + k*(1-prob_win))).toFixed(1);
    winner.elo = rate_win;
    // console.log(winner);
    let rate_lose = parseFloat((loser.elo + k*(0-prob_lose))).toFixed(1);
    loser.elo = rate_lose;
    // console.log(loser);
    ////////////////////////////////////////////////////////////TU TERAZ ZRÓB JAKOŚ, ŻEBY BYŁY DWA JSON'Y W BODY REQUEST CZY COŚ
    const result = {winner, loser};

    // console.log(JSON.stringify(result));
    fetch('./', {
    method: "POST",
    body: JSON.stringify(result),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })

    .then((response) => response.json())
    .then((json) => console.log(json))
    .then(console.log("losulosu"))
    .then(losulosu());
}

// function update(episodes, winner, loser, rw, rl){
//     //console.log(episodes);
//     for (ep of episodes.episodes){
//         console.log(ep.no);
//         if (ep.no == winner.no){
//             ep.elo = rw;
//         }
//         else if (ep.no == loser.no){
//             ep.elo = rl;
//         }
//     }
//     fs.writeFile("stats.json", episodes, (error) => {
//         // if the reading process failed,
//         // throwing the error
//         if (error) {
//           // logging the error
//           console.error(error);
      
//           throw error;
//         }

//   console.log("nieeee wiem");
// });
        //console.log(episodes.episodes[i].no);
// }
