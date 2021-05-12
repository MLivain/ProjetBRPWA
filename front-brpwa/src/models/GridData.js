import CarteData from '../assets/Carte.json';

export default class GridData {
    cells = [];
    GetCellsFromJson(){
        const data = CarteData;
        const width = data.width;
        let currentRow = [];
        for(let i = 0 ; i < data.layers[0].data.length; i++){
            if(i % width == 0 && i !== 0){
                this.cells.push(currentRow);
                currentRow = [];
            }
            const cell = { x : i % width, y : Math.floor(i/width) , backgroundTile :data.layers[0].data[i] - 1, obstacleTile :data.layers[1].data[i] - 1};
            currentRow.push(cell);
        }
        this.cells.push(currentRow);
    }
    constructor(){}
}
