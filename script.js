let currentPlayer = 0;
let players = ["Red", "Green", "Blue", "Yellow"];
let positions = [0, 0, 0, 0];
let finished = [false, false, false, false];

const path = [];

for (let i = 0; i < 10; i++) path.push({x:20 + i*35, y:380});
for (let i = 0; i < 10; i++) path.push({x:380, y:380 - i*35});
for (let i = 0; i < 10; i++) path.push({x:380 - i*35, y:30});
for (let i = 0; i < 9; i++) path.push({x:30, y:30 + i*35});

function rollDice() {
  if (finished[currentPlayer]) {
    nextTurn();
    return;
  }

  let dice = Math.floor(Math.random() * 6) + 1;
  document.getElementById("diceSound").play();

  document.getElementById("info").innerText =
    players[currentPlayer] + " rolled: " + dice;

  moveToken(currentPlayer, dice);
}

function moveToken(player, steps) {
  positions[player] += steps;

  if (positions[player] >= path.length - 1) {
    positions[player] = path.length - 1;
    finished[player] = true;
    document.getElementById("winSound").play();
    document.getElementById("info").innerText =
      "🏆 " + players[player] + " Wins!";
  }

  let token = document.getElementById("token" + player);
  token.style.left = path[positions[player]].x + "px";
  token.style.top = path[positions[player]].y + "px";

  document.getElementById("moveSound").play();

  checkKill(player);

  if (!finished[player]) {
    nextTurn();
  }
}

function checkKill(player) {
  for (let i = 0; i < 4; i++) {
    if (i !== player && positions[i] === positions[player] && !finished[i]) {
      positions[i] = 0;
      let token = document.getElementById("token" + i);
      token.style.left = path[0].x + "px";
      token.style.top = path[0].y + "px";
    }
  }
}

function nextTurn() {
  currentPlayer = (currentPlayer + 1) % 4;
}

function restartGame() {
  positions = [0, 0, 0, 0];
  finished = [false, false, false, false];
  currentPlayer = 0;

  for (let i = 0; i < 4; i++) {
    let token = document.getElementById("token" + i);
    token.style.left = path[0].x + "px";
    token.style.top = path[0].y + "px";
  }

  document.getElementById("info").innerText = "Game Restarted!";
}