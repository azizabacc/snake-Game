let gameFloor = document.getElementById('gameFloor');
let width = 59;
let snakeIndex =0;
let snakeLength =0;
let mouseIndex =0;
let direction =0;

//generate Grid
const generateGrid = () =>{
    for(i=0;i<2000;i++){
        let tile = document.createElement('div');
        tile.className ="tile";
        gameFloor.append(tile);
    }
}
generateGrid();//call function
//grid dimensions
const getGridDimensions = () => {
  const computedStyle = window.getComputedStyle(gameFloor);
  const gridColumnTemplate = computedStyle.gridTemplateColumns;
  const gridRowTemplate = computedStyle.gridTemplateRows;

  const columnCount = gridColumnTemplate.split(' ').length;
  const rowCount = gridRowTemplate.split(' ').length;

  return {
    columns: columnCount,
    rows: rowCount
  };
};
let dimensions = getGridDimensions();
console.log(dimensions)
//generate mouse
const generateMouse = () =>{
  do{
    mouseIndex  = Math.floor(1 + Math.random() * gameFloor.childElementCount);
    gameFloor.children[mouseIndex ].className="mouse";
}while(snakeIndex==mouseIndex)
}

generateMouse();

//switch Class function

const switchClass = (snakeIndex,nextTileIndex)=>{ // SNAKE => SNAKEINDEX AND TILE => SNAKEINDEX+DIRECTION
  if(gameFloor.children[nextTileIndex].className!='mouse' && gameFloor.children[nextTileIndex].className!='snake'){
    gameFloor.children[snakeIndex].className ='tile';
    gameFloor.children[nextTileIndex].className = 'snake';
   
  }else if(gameFloor.children[nextTileIndex].className=='mouse'){
    snakeLength +=1;
    gameFloor.children[nextTileIndex].className = 'snake';
    snakeIndex = nextTileIndex;
    generateMouse();

  }

}
const moveSnake = () => {

  switchClass(snakeIndex, snakeIndex + direction);
  snakeIndex  = snakeIndex + direction;
};
// move function
const control= (e)=> {
    if (e.keyCode === 39) {
      direction = 1; // right
    } else if (e.keyCode === 38) {
      direction = -dimensions.columns; //up
    } else if (e.keyCode === 37) {
      direction = -1; // left
    } else if (e.keyCode === 40) {
      direction = +dimensions.columns; // down 

    }
    
  }
//generate Snake
snakeIndex = Math.floor(1 + Math.random() * gameFloor.childElementCount);
gameFloor.children[snakeIndex ].className="snake";
setInterval(moveSnake,500);

document.addEventListener("keydown",control)

