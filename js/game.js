class Game {
  constructor() {
    this.startScreen = document.getElementById(`game-intro`);
    this.gameScreen = document.getElementById(`game-screen`);
    this.endScreen = document.getElementById(`game-end`);
    this.player = new Player(50, 50, "../image/tipito3.png"); //falta la imagen que no me la toma
    this.height = 500;
    this.width = 600;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }

  start() {
    //set the hight and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    //hide the start screen
    this.startScreen.style.display = `none`;
    //show the game screen
    this.gameScreen.style.display = `block`;
    //start the game loop
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }
  gameLoop() {
    console.log(`this is the game loop`);
    this.update();
    if (this.isGameOver) {
      clearInterval(this.gameIntervalId);
    }
  }
  update() {}
}
