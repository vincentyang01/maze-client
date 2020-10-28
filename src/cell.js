const rows = Math.floor((window.innerHeight / 40) - 5)
const columns = Math.floor((window.innerWidth / 40) - 15)
let grid = [];

class Cell {
  constructor(x, y) {
    this.row = x;
    this.column = y;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.neighbors = [];
  }

  findNeighbors() {
    if (this.row > 0) {
      this.neighbors.push(grid[(this.row - 1) * columns + this.column]);
    }
    if (this.column < columns - 1) {
      this.neighbors.push(grid[this.row * columns + (this.column + 1)]);
    }
    if (this.row < rows - 1) {
      this.neighbors.push(grid[(this.row + 1) * columns + this.column]);
    }
    if (this.column > 0) {
      this.neighbors.push(grid[this.row * columns + (this.column - 1)])
    };
  }

  show() {
    if (!this.walls[0])
      cells[this.row * columns + this.column].style["border-top"] = "none";
    if (!this.walls[1])
      cells[this.row * columns + this.column].style["border-right"] = "none";
    if (!this.walls[2])
      cells[this.row * columns + this.column].style["border-bottom"] = "none";
    if (!this.walls[3])
      cells[this.row * columns + this.column].style["border-left"] = "none";

    if (this.visited)
      cells[this.row * columns + this.column].style.background = "rgb(255, 89, 16)";
  }
}

function makeGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid.push(new Cell(i, j));
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid[i * columns + j].findNeighbors();
    }
  }
}

const createMazeRowAndColDivs = () => {
  const mazeDiv = document.querySelector('#maze')
  for (let y = 0; y < rows; y++) {
    let row = document.createElement('div');
    row.classList.add('row');
    if (y === 0) row.classList.add('top-row');
    mazeDiv.appendChild(row);

    for (let x = 0; x < columns; x++) {
      let column = document.createElement('div');
      column.classList.add('cell');
      if (x === 0) column.classList.add('column-left');
      row.appendChild(column);
    }
  }
}

createMazeRowAndColDivs();
const cells = document.querySelectorAll('.cell');
makeGrid();