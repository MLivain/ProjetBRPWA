export default class Player {
  constructor(id, posX, posY) {
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.lifePoints = 100;
    this.attack = 10;
  }

  setPosition(x, y) {
    this.posX = x;
    this.posY = y;
  }

  isInPosition(x, y) {
    return this.posX === x && this.posY === y;
  }

  getDamages(x) {
    this.lifePoints = this.lifePoints - x;

    if (this.lifePoints <= 0) return true;
    else return false;
  }
}
