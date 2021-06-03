import CarteData from "../assets/Carte.json";


export class CellData {

  constructor(x ,  y ,  backgroundTile ,  obstacleTile ){
    this.x =x;
    this.y= y;
    this.backgroundTile= backgroundTile;
    this.obstacleTile = obstacleTile;
    this.accessible = false;
    this.step = 0;
  }

  get isObstacle(){
      return this.obstacleTile >=0;
  }

}

export default class GridData {
  cells = [];
  GetCellsFromJson() {
    const data = CarteData;
    const width = data.width;
    let currentRow = [];
    for (let i = 0; i < data.layers[0].data.length; i++) {
      if (i % width == 0 && i !== 0) {
        this.cells.push(currentRow);
        currentRow = [];
      }
      const cell = new CellData(i % width,Math.floor(i / width),data.layers[0].data[i] - 1, data.layers[1].data[i] - 1);
      
      currentRow.push(cell);
    }
    this.cells.push(currentRow);
  }
  cellIsWalkable(x, y) {
    if (x < 0 || x >= this.cells[0].length || y < 0 || y >= this.cells.length) {
      return false;
    }
    return !this.cells[y][x].isObstacle;
  }
  accessibleCellsAround(x, y, distance, step ,existingSet ) {
    if (distance == 0) {
      return existingSet;
    }
    const directions = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];
    for (const dir of directions) {
      const target = { x: x + dir.x, y: y + dir.y };
      if (this.cellIsWalkable(target.x, target.y)) {
        let cell = this.cells[target.y][target.x];
        if (cell.step === 0 || step < cell.step) {
          cell.step = step; 
          existingSet.add(cell);
          this.accessibleCellsAround(target.x, target.y, distance - 1, step + 1, existingSet);
        }
      }
    }
    return existingSet;
  }

  clearCellStep(){
    this.cells.forEach(cellRow=>{
      cellRow.forEach(cell=>{
        cell.step =0;
      });
    });
  }
  constructor() { }
}
