export default class Player {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.lifePoints = 100;
  }

  setPosition(x, y) {
    this.posX = x;
    this.posY = y;
  }

  isInPosition(x, y) {
    return this.posX === x && this.posY === y;
  }
}
