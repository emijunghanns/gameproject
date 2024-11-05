class Player {
  constructor(top, left, playerImage) {
    this.gameScreen = document.getElementById(`game-screen`);
    this.top = top; // vertical position (y-axis)
    this.left = left; // horizontal position (x-axis)
    this.width = 110;
    this.height = 200;
    this.directionX = 2; // horizontal movement (not being used in current logic)
    this.directionY = 0; // vertical movement (gravity and jump)
    this.isOnGround = true;
    this.gravity = 0.5;
    this.jumpStrength = -15;
    this.groundLevel = 800; // Set ground level where the player should land
    this.element = document.createElement("img");
    this.element.src = playerImage;
    this.element.style.position = `absolute`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    // Add the image to the game screen
    this.gameScreen.appendChild(this.element);
  }

  jump() {
    if (this.isOnGround) {
      this.directionY = this.jumpStrength; // Set jump strength (negative for upward motion)
      this.isOnGround = false; // Player is now in the air
    }
  }

  move() {
    // Apply gravity when the player is not on the ground
    if (!this.isOnGround) {
      this.directionY += this.gravity; // Apply gravity force
    }

    // Update the player's vertical position
    this.top += this.directionY; // Change the `top` value based on directionY
    this.left += this.directionX;
    if (this.left > 800) {
      this.left = 800;
    }
    // arreglar que no se vaya al infinito izquierdo
    this.left += this.directionX;
    if (this.left < 100) {
      this.left = 100;
    }
    // Check if the player hits the ground (Y-axis)
    if (this.top >= this.groundLevel) {
      this.top = this.groundLevel; // Prevent player from going below the ground
      this.isOnGround = true; // Player has landed
      this.directionY = 0; // Stop vertical movement
    }
    this.updatePosition(); // Update the player’s position in the DOM
  }

  updatePosition() {
    // Update the player’s position on the screen by modifying the `top` and `left` CSS properties
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    // Check for collision between the player and an obstacle
    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
