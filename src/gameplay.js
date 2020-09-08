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
let play = false;
let goal = grid[rows * columns - 1];
let visualizer = setInterval(animate, 20);
let showMazeGeneration = true;
let startTimerFlag = false;
let clock;

let btn = document.querySelector(".generate-maze");
btn.addEventListener("click", function () {
  clearInterval(visualizer);
  resetTimer()
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
  goal = grid[rows * columns - 1];
  if (showMazeGeneration) visualizer = setInterval(animate, 20);
  else {
    while (!play) {
      animate();
    }
  }
});

let checkbox = document.querySelector(".checkbox");
checkbox.addEventListener("click", function () {
  if (checkbox.innerHTML.includes("check"))
    checkbox.innerHTML = `<i class="fas fa-times"></i>`;
  else checkbox.innerHTML = `<i class="fas fa-check"></i>`;
  showMazeGeneration = !showMazeGeneration;
});

document.body.addEventListener("keydown", function (e) {
  if (play) {

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
    sendScore(time)
  }
}

function upArrowPressed() {
  if (!current.walls[0]) current = grid[(current.row - 1) * columns + current.column];
}

function leftArrowPressed() {
  if (!current.walls[3]) current = grid[current.row * columns + (current.column - 1)];
}

function rightArrowPressed() {
  if (!current.walls[1]) current = grid[current.row * columns + (current.column + 1)];
}

function downArrowPressed() {
  if (!current.walls[2]) current = grid[(current.row + 1) * columns + current.column];
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
    time -= 1
    console.log(time)
    timer.innerText = time + "s"
  }, 1000)
}

function stopTimer() {
  let timer = document.getElementById("timer")
  let time = parseInt(timer.innerText)
  clearTimeout()
  return time
}