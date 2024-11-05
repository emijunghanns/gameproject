class Game {
  constructor() {
    this.startScreen = document.getElementById(`game-intro`);
    this.gameScreen = document.getElementById(`game-screen`);
    this.endScreen = document.getElementById(`game-end`);
    this.livesElement = document.getElementById(`lives`);
    this.player = new Player(800, 150, "../image/tipito3.png");
    this.height = 500;
    this.width = 400;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.goodobstacles = [new GoodObs(this.gameScreen)];
    this.score = 0;
    this.lives = 4;
    this.isGameOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.bindEvents();
    this.frames = 0;
  }

  bindEvents() {
    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        // Start jump if the player is on the ground
        if (this.player.isOnGround) {
          this.player.jump(); // Trigger the jump
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      // Handle other key events (like movement) if necessary
    });
  }

  start() {
    //set the hight and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    //hide the start screen
    this.startScreen.style.display = `none`;
    this.endScreen.style.display = `none`;
    //show the game screen
    this.gameScreen.style.display = `block`;

    //start the game loop
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    // console.log(`this is the game loop`);
    this.frames++;
    this.update();
    if (this.isGameOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }
    if (this.frames % 120 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
    if (this.frames % 150 === 0) {
      this.goodobstacles.push(new GoodObs(this.gameScreen));
    }
  }

  update() {
    this.player.move();
    this.obstacles.forEach((oneObstacle, oneObstacleIndex) => {
      oneObstacle.move();
      //this checks each bad obstacle if it collided with my player
      const didHitMyPlayerBadly = this.player.didCollide(oneObstacle);
      //if it hits, we substract a life, remove object and remove from array
      console.error(didHitMyPlayerBadly);
      //conditional checking when it hits
      if (didHitMyPlayerBadly) {
        //substract a life
        this.lives--;
        if (this.lives === 0) {
          this.isGameOver = true;
        }
        //update the lives from DOM to new value
        this.livesElement.innerText = this.lives;
        //splice the obstacle out of the array
        this.obstacles.splice(oneObstacleIndex, 1);
        //remove the object from the DOM
        oneObstacle.element.remove();
      }
      //check that the obstacle passes the left side
      //then remove it from the array and the DOM
      if (oneObstacle.left + oneObstacle.width < 0) {
        this.obstacles.splice(oneObstacleIndex, 1);
        oneObstacle.element.remove();
      }
    });

    this.goodobstacles.forEach((oneGoodObstacle, oneGoodObstacleIndex) => {
      oneGoodObstacle.move();
      const didHitMyPlayerWell = this.player.didCollide(oneGoodObstacle);
      //if it hits, we keep 4 lives or add a life, remove object from DOM and remove from array
      console.error(didHitMyPlayerWell);
      //conditional checking when it hits
      if (didHitMyPlayerWell) {
        //add or keep 4 lives
        if (this.lives <= 3) {
          this.lives++;
        }
        //update the lives from DOM to new value
        this.livesElement.innerText = this.lives;
        //splice the obstacle out of the array
        this.goodobstacles.splice(oneGoodObstacleIndex, 1);
        //remove the object from the DOM
        oneGoodObstacle.element.remove();
      }
      //check that the obstacle passes the left side
      //then remove it from the array and the DOM
      if (oneGoodObstacle.left + oneGoodObstacle.width < 0) {
        this.goodobstacles.splice(oneGoodObstacleIndex, 1);
        oneGoodObstacle.element.remove();
      }
    });
  }
  gameOver() {
    this.gameScreen.style.display = `none`;
    this.endScreen.style.display = `block`;
  }
}
