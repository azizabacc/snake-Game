let gameFloor = document.getElementById('gameFloor');
let width = 59;

// Class Snake
class Snake {
  constructor() {
    this.snakeSegments = []; // array of snake's organs : le tail at the beginging and the head at the end
    this.mouseIndex = 0;
    this.direction = 0;
  }

  generateGrid() {
    for (let i = 0; i < 2000; i++) {
      let tile = document.createElement('div');
      tile.className = "tile";
      gameFloor.append(tile);
    }
  }

  getGridDimensions() {
    const computedStyle = window.getComputedStyle(gameFloor);
    const gridColumnTemplate = computedStyle.gridTemplateColumns;
    const gridRowTemplate = computedStyle.gridTemplateRows;

    const columnCount = gridColumnTemplate.split(' ').length;
    const rowCount = gridRowTemplate.split(' ').length;

    return {
      columns: columnCount,
      rows: rowCount
    };
  }

  generateMouse() {
    let mouseIndex;
    do {
      mouseIndex = Math.floor(1 + Math.random() * gameFloor.childElementCount);
    } while (this.snakeSegments.includes(mouseIndex));

    gameFloor.children[mouseIndex].className = "mouse";
    return mouseIndex;
  }

  switchClass(nextTileIndex) {
    if (gameFloor.children[nextTileIndex].className != 'mouse' && gameFloor.children[nextTileIndex].className != 'snake') {
      const tailIndex = this.snakeSegments.shift(); // delete the tail of the snake
      gameFloor.children[tailIndex].className = 'tile';

      this.snakeSegments.push(nextTileIndex); // add the head of the snake
      gameFloor.children[nextTileIndex].className = 'snake';
    } else if (gameFloor.children[nextTileIndex].className == 'mouse') {
      this.snakeSegments.push(nextTileIndex); // add a new head to the snake after eating
      gameFloor.children[nextTileIndex].className = 'snake';

      const newMouseIndex = this.generateMouse();
      this.mouseIndex = newMouseIndex;
    }
  }

  moveSnake() {
    const headIndex = this.snakeSegments[this.snakeSegments.length - 1];
    const nextTileIndex = headIndex + this.direction;
    this.switchClass(nextTileIndex);
  }

  control(e) {
    if (e.keyCode === 39) {
      this.direction = 1; // right
    } else if (e.keyCode === 38) {
      this.direction = -this.getGridDimensions().columns; //up
    } else if (e.keyCode === 37) {
      this.direction = -1; // left
    } else if (e.keyCode === 40) {
      this.direction = +this.getGridDimensions().columns; // down 
    }
  }

  startGame() {
    const initialSnakeIndex = Math.floor(1 + Math.random() * gameFloor.childElementCount);
    this.snakeSegments.push(initialSnakeIndex);
    gameFloor.children[initialSnakeIndex].className = "snake";
    setInterval(this.moveSnake.bind(this), 500);
    document.addEventListener("keydown", this.control.bind(this));
    this.generateMouse();
  }
}

// create a new instance of the class snake
const snakeGame = new Snake();
snakeGame.generateGrid();
snakeGame.startGame();
