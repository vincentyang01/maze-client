let current = grid[0];
let stack = [];
let vileLocation = [];



function MazeGenerator() {
  cells[current.row * columns + current.column].style.background = "rgb(102, 179, 229)"
  if (!current.visited) {
    current.visited = true;
    stack.push(current);
  }

  let unvisited = [];
  for (let neighbor of current.neighbors) {
    if (!neighbor.visited) {
      unvisited.push(neighbor);
    }
  }

  if (unvisited.length > 0) {
    let random = Math.floor(Math.random() * unvisited.length);
    let next = unvisited[random];

    let x = current.row - next.row;
    if (x === 1) {
      current.walls[0] = false;
      next.walls[2] = false;
    } else if (x === -1) {
      current.walls[2] = false;
      next.walls[0] = false;
    }

    let y = current.column - next.column;
    if (y === 1) {
      current.walls[3] = false;
      next.walls[1] = false;
    } else if (y === -1) {
      current.walls[1] = false;
      next.walls[3] = false;
    }

    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  } else {
    clearInterval(visualizer);
    play = true;
    cells[current.row * columns + current.column].style.background = "rgb(255, 89, 16)";
    cells[goal.row * columns + goal.column].innerHTML = virus;
    cells[current.row * columns + current.column].innerHTML = vaccine;
    let random = Math.floor(Math.random() * cells.length)
    if(random == 0) random = 1;
    if(random == cells.length -1 ) random - 2;
    cells[random].innerHTML = vile //Create a vial
    generateVile() //On creation, generate a vial a second vial
  }
}




function generateVile() {
  let random = Math.floor(Math.random() * cells.length)
  if(random < 1) random = 2
  if(random > cells.length) random - 2
  cells[random].innerHTML = vile
  //Generate the second vial
  //Find locations of all the vials
  findViles()
  // }
}





function animate() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid[i * columns + j].show();
    }
  }
  MazeGenerator();
}

