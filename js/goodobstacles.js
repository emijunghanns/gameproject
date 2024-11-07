class GoodObs {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.positions = [670, 500];
    this.images = [
      "image/goodobstacles/airfryer.png",
      "image/goodobstacles/broccoli.png",
      "image/goodobstacles/coffee.png",
      "image/goodobstacles/palm.png",
      "image/goodobstacles/sleep.png",
    ];
    this.randomIndex = Math.floor(Math.random() * this.positions.length);
    this.randomImgIndex = Math.floor(Math.random() * this.images.length);
    this.top = this.positions[this.randomIndex];
    this.left = 1500;
    this.width = 60;
    this.heigth = 60;
    this.element = document.createElement("img");
    this.element.src = this.images[this.randomImgIndex];
    this.element.style.position = `absolute`;
    this.element.style.height = `${this.heigth}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    // Add the image to the game screen
    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.left -= 4;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }
}
