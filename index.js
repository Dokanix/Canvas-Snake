const canvas = document.querySelector("canvas");
// const cellAdder = document.querySelector(".cell-adder");
const slowButton = document.querySelector(".slower");
const fastButton = document.querySelector(".faster");
const header = document.querySelector("h1");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let speed = 3;

class Fruit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

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

    if (this.collision()) {
      gameOver();
    }


    fruits.forEach((fruit, fruitIndex) => {
      if (this.cells[this.cells.length - 1].x == fruit.x && this.cells[this.cells.length - 1].y == fruit.y) {
        this.addCell();
        fruits.splice(fruits[fruitIndex]);
        spawnFruit();
      }
    })
  };

  addCell = () => {
    const x = this.cells[0].x;
    const y = this.cells[0].y;
    const cell = new Cell(x, y);

    this.cells.unshift(cell);
  };

  collision = () => {
    const head = this.cells[this.cells.length - 1];

    if (head.x < 0 || head.x > canvas.width || head.y < 0 || head.y > canvas.height) {
      return true;
    }

    for (let i = 0; i < this.cells.length - 2; i++) {
      if (head.x == this.cells[i].x && head.y == this.cells[i].y) {
        return true;
      }
    }
    return false;
  }
}

const gameOver = () => {
  header.textContent = "Game Over";
  clearInterval(interval);
}

const fruits = [];
let round = 0;

const player = new Player();
// cellAdder.addEventListener("click", player.addCell);

const spawnFruit = () => {
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let randomOffset = Math.floor(Math.random() * 10 - 5) * player.size; 
  x = x + randomOffset;
  randomOffset = Math.floor(Math.random() * 10 - 5) * player.size; 
  y = y + randomOffset;

  fruits.push(new Fruit(x, y));
}

spawnFruit();

const update = () => {
  const directionText = document.querySelector(".direction");
  const pointsText = document.querySelector(".points");
  directionText.textContent = player.direction;
  pointsText.textContent = player.cells.length;

  round++;

  c.clearRect(0, 0, canvas.width, canvas.height);

  player.movePosition();


  c.fillStyle = player.color;
  for (const cell of player.cells) {
    c.fillRect(cell.x, cell.y, player.size, player.size);
  }

  c.fillStyle = "purple";
  for (const fruit of fruits) {
    c.fillRect(fruit.x, fruit.y, player.size, player.size);
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
      update();
      break;
    default:
      break;
  }
});

let interval = setInterval(update, 1000 / speed);

slowButton.addEventListener("click", () => {
  speed /= 2;
  clearInterval(interval);
  interval = setInterval(update, 1000 / speed);
})

fastButton.addEventListener("click", () => {
  speed *= 2;
  clearInterval(interval);
  interval = setInterval(update, 1000 / speed);
})
