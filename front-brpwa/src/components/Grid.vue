<template>
  <div class="game-container">
    <div class="game-row" v-for="(row, index) in cells" :key="`row-${index}`">
      <cell
        :x="cell.x"
        :y="cell.y"
        :backgroundTile="cell.backgroundTile"
        :obstacleTile="cell.obstacleTile"
        :as-player="listPlayerPos.some((e) => e.isInPosition(cell.x, cell.y))"
        v-for="(cell, index) in row"
        :key="`cell-${index}`"
        v-on:cell-clicked="clicked"
      >
      </cell>
    </div>
     <div class="player-actions">
      <v-btn v-on:click="playerMove">Se déplacer</v-btn>
      <v-btn v-on:click="attack">Attaquer</v-btn>
    </div>
  </div>
   
</template>
<script>
import GridData from "../models/GridData";
import Cell from "./Cell.vue";
import Player from "@/models/Player";

export default {
  components: { Cell },
  name: "Grid",
  data: () => ({
    cells: [],
    listPlayerPos: [new Player(1, 1)],
    grid : new GridData()
  }),
  async created() {
   
    this.grid.GetCellsFromJson();
    this.cells = this.grid.cells;
  },
  methods: {
    clicked(e) {
      this.listPlayerPos[0].setPosition(e.x, e.y);
       this.$emit("cell-walkable", []);
    },
    playerMove(){
      const player = this.listPlayerPos[0];
      const cells = this.grid.accessibleCellsAround(player.posX , player.posY ,5,1 , new Set());
      this.grid.clearCellStep();
      this.$emit("cell-walkable", Array.from(cells));
      
    },
    attack(){

    }
  },
};
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}
.game-row {
  display: flex;
  flex-direction: row;
}
</style>
