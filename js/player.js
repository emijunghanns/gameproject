class Player {
  constructor(top, left, playerImage) {
    this.gameScreen = document.getElementById(`game-screen`);
    this.top = top;
    this.left = left;
    this.width = 75;
    this.height = 150;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = playerImage;
    this.element.style.position = `absolute`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    //add the image to the screen
    this.gameScreen.appendChild(this.element);
  }
  move() {}
  updatePosition() {}
  didCollide() {}
}
