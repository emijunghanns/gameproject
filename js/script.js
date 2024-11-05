window.onload = function () {
  const startButton = document.getElementById("startbutton");
  const restartButton = document.getElementById("restart-button");

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");
    const myGame = new Game();
    myGame.start();
  }
};
