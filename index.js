const canvas = document.querySelector("canvas");
const cellAdder = document.querySelector(".cell-adder");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const SPEED = 1;

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Player {
  constructor() {
    this.size = 50;
    this.color = "green";
    this.direction = "right";
    this.cells = [new Cell(canvas.width / 2, canvas.height / 2)];
  }

  movePosition = () => {
    for (let i = 0; i < this.cells.length - 1; i++) {
      this.cells[i].x = this.cells[i + 1].x;
      this.cells[i].y = this.cells[i + 1].y;
    }

    switch (this.direction) {
      case "up":
        this.cells[this.cells.length - 1].y -= this.size;
        break;
      case "down":
        this.cells[this.cells.length - 1].y += this.size;
        break;
      case "left":
        this.cells[this.cells.length - 1].x -= this.size;
        break;
      case "right":
        this.cells[this.cells.length - 1].x += this.size;
    }
  };

  addCell = () => {
    const x = this.cells[0].x;
    const y = this.cells[0].y;
    const cell = new Cell(x, y);

    this.cells.unshift(cell);
  };
}

const player = new Player();
cellAdder.addEventListener("click", player.addCell);

const draw = () => {
  const directionText = document.querySelector(".direction");
  const pointsText = document.querySelector(".points");
  directionText.textContent = player.direction;
  pointsText.textContent = player.cells.length;

  c.clearRect(0, 0, canvas.width, canvas.height);

  player.movePosition();

  c.fillStyle = player.color;
  console.log("-----------");
  for (const cell of player.cells) {
    console.log(cell);
    c.fillRect(cell.x, cell.y, player.size, player.size);
  }
};

addEventListener("keydown", (event) => {
  switch (event.key) {
    case "a":
      player.direction = "left";
      break;
    case "d":
      player.direction = "right";
      break;
    case "w":
      player.direction = "up";
      break;
    case "s":
      player.direction = "down";
      break;
    case "n":
      draw();
      break;
    default:
      break;
  }
});

setInterval(draw, 1000 / SPEED);
