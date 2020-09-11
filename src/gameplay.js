const virus = `
<span style="font-size: 25px">
  <i class="fas fa-biohazard"></i>
</span>
`;
const vaccine = `
<span style="font-size: 25px">
  <i class="fas fa-prescription"></i>
</span>
`;
const vile = `
<span style="font-size: 25px">
<i class="fas fa-vial" data-points="1" data-collected="false" display="block"></i>
</span>
`
let play = false;
let goal = grid[rows * columns - 1];
let visualizer = setInterval(animate, 20);
let showMazeGeneration = true;
let startTimerFlag = false;
let clock;
let vialLocation = []
let vialsBeenAt = []
let vileCount = 0
let user = document.getElementById("current-user")
let maxScore = document.getElementById("max-score")
let gamesPlayed = document.getElementById("games-played")
let totalScore = document.getElementById("total-score")
let totalViles = document.getElementById("total-viles")
let roundtwo = false

let btn = document.querySelector(".generate-maze");
btn.addEventListener("click", function () {
  clearInterval(visualizer);
  resetTimer()
  vileCount = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      cells[i * columns + j].removeAttribute("style");
      cells[i * columns + j].innerHTML = "";
    }
  }
  grid = [];
  makeGrid();
  current = grid[0];
  stack = [];
  play = false;
  vialsBeenAt = []
  roundtwo = false
  clearTimeout(clock)
  goal = grid[rows * columns - 1];
  vileLocation = []
  if (showMazeGeneration) visualizer = setInterval(animate, 20);
  else {
    while (!play) {
      animate();
    }
  }
});

let generator = document.querySelector(".generator");
generator.addEventListener("click", function () {
  if (generator.textContent.includes("Yes")) {
    generator.dataset.id = 'no';
    generator.textContent = "Not Now";
  } else {
    generator.dataset.id = 'yes';
    generator.textContent = "Heck Yes!";
  }
  showMazeGeneration = !showMazeGeneration;
});

document.body.addEventListener("keydown", function (e) {
  if (play && overlay.style.display == "none") {
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      virusAnimation();
    }
    cells[current.row * columns + current.column].innerHTML = ``;
    if (!startTimerFlag) {
      startTimer()
    }
    if (e.key === "ArrowUp") upArrowPressed();
    if (e.key === "ArrowLeft") leftArrowPressed();
    if (e.key === "ArrowRight") rightArrowPressed();
    if (e.key === "ArrowDown") downArrowPressed();
    cells[current.row * columns + current.column].innerHTML = vaccine;
    checkWin();
  }
});

function checkWin() {
  if (current === goal) {
    console.log("WON");
    play = false;
    stopTimer()
  }
}

function upArrowPressed() {
  if (!current.walls[0]) {
    current = grid[(current.row - 1) * columns + current.column];
  }
  stepOnVile()
}

function leftArrowPressed() {
  if (!current.walls[3]) {
    current = grid[current.row * columns + (current.column - 1)];
  }
  stepOnVile()
}

function rightArrowPressed() {
  if (!current.walls[1]) {
    current = grid[current.row * columns + (current.column + 1)];
  }
  stepOnVile()
}

function downArrowPressed() {
  if (!current.walls[2]) {
    current = grid[(current.row + 1) * columns + current.column];
  }
  stepOnVile()
}





function findViles() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].firstElementChild != null) {
      console.log("inside findViles")
      vileLocation.push(i)
    }
  }
  console.log("pushing and popping") //, 24, 30 
  //Loops over all cells and gets all locations into vileLocation array
  if (roundtwo) {
    removeCurrentAndLast()
  } else {
    removeFirstAndLast()
  }
}

function removeFirstAndLast() {
  //Removes 0 and max for start and finish
  vileLocation.shift()
  vileLocation.pop()
  console.log(`end of removeFirstAndLast ${vileLocation}`)
}

function removeCurrentAndLast() {
  const index = vileLocation.indexOf(current)
  if (index > -1) {
    vileLocation.splice(index, 1)
  }
  vileLocation.pop()
}





function stepOnVile() {
  let currentLocation //Current holds postion via col and row but not length 
  if (current.row == 0) {
    currentLocation = current.column;
  }
  if (current.row > 0) {
    currentLocation = current.row * columns + current.column;
  }
  //Check each step if there is a vial 
  //If the vial location is present in the array
  //Store it for tracking in vialsBeenAt
  //Removing it from the current list of locations in vileLocation
  if (vileLocation.includes(currentLocation)) {
    console.log("Inside the includes for stepOnVial")
    vialsBeenAt.push(currentLocation);

    const index = vileLocation.indexOf(currentLocation);
    if (index > -1) {
      vileLocation.splice(index, 1);
    }
    cells[currentLocation].innerHTML = ""
    //Change the flag to not be active
    console.log("hit the vile")
    console.log(`vileLocation length: ${vileLocation}`)

    checkVisited()
  }
  //Keep checking if the array is empty
}

function checkVisited() {
  //If the array is empty
  if (vileLocation.length < 1) {
    generateAdditionalVial()
    console.log("Greetings!!")
  }
  console.log(`vilelocation array: ${vileLocation}`)
}

function generateAdditionalVial() {
  let random = Math.floor(Math.random() * (cells.length - 3))
  if (random < 1) random = 2
  if (random > cells.length) random - 2
  // debugger
  cells[random].innerHTML = vile
  roundtwo = true
  findViles()
}






function resetTimer() {
  document.getElementById("timer").innerText = "60s"
  startTimerFlag = false
}

function startTimer() {
  startTimerFlag = true
  let timer = document.getElementById("timer")
  let time = parseInt(timer.innerText)
  clock = setInterval(function () {
    if (time > 0) {
      time -= 1
      console.log(time)
      timer.innerText = time + "s"
    }
    if (time == 0) {
      ifTimeOut()
    }
  }, 1000)

}

function ifTimeOut() {

  play = false
  alert("You failed to reach the final line before time ran out. You have earned 0 vials.")
}

function renderUser(success) {
  user.innerText = success.name
  user.dataset.id = success.user_id
}

function stopTimer() {
  clearTimeout(clock)
  console.log("def here")
  packScore()
  getFinalScore()
  newPlayer = true
}


const virusAnimation = () => {
  if (play) {
    createVirusBubble()
  }
}

function getFinalScore() {
  alert(`You have collected ${vialsBeenAt.length} vials.`)
}

function packScore() {
  let timer = document.getElementById("timer")
  let time = parseInt(timer.innerText)
  let userId = parseInt(user.dataset.id)
  sendScore(time, userId)

  patchTotalPoints(time, userId, totalScore);
  let currString = totalScore.innerText.split(" ")
  let num = parseInt(currString[3]) + time
  totalScore.innerText = `Total score is: ${num}`

  let gamesStr = gamesPlayed.innerText.split(" ")
  let game = parseInt(gamesStr[4])
  game++
  gamesPlayed.innerText = `Number of games played: ${game}`

  let maxScoreStr = maxScore.innerText.split(" ")
  let max = parseInt(maxScoreStr[4])
  if (time > max) {
    maxScore.innerText = `Your current high score is: ${time}`
  }
  findOrCreateBy((user.innerText))
}


function renderNewMaxScore(newHighscore) {
  console.log(`we here ${newHighscore}`)
  maxScore.innerText = `Your current high score: ${newHighscore}`
}



function renderMaxScore(highscore) {
  if (highscore == undefined) {
    maxScore.innerText = `Your current high score: 0`
  } else {
    maxScore.innerText = `Your current high score: ${highscore}`
  }
}

function renderGamesPlayed(count) {
  gamesPlayed.innerText = `Number of games played: ${count}`
}

function renderTotalScore(total) {
  totalScore.innerText = `Total score is: ${total}`
}