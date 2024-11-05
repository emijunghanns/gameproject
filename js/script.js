window.onload = function () {
  const startButton = document.getElementById("startbutton");
  const restartButton = document.getElementById("restart-button");
  let myGame;

  startButton.addEventListener("click", function () {
    startGame();
  });

  //keydown for listening to to your keyboard
  document.addEventListener("keydown", (event) => {
    console.log("a key was pressed", event.code);
    //check for which button was pressed
    if (event.code === `Space`) {
      myGame.player.directionY = -2;
    }
    if (event.code === `ArrowLeft`) {
      myGame.player.directionX = -2;
    }
    if (event.code === `ArrowRight`) {
      myGame.player.directionX = 2;
    }
  });

  function startGame() {
    console.log("start game");
    myGame = new Game();
    myGame.start();
  }
};
