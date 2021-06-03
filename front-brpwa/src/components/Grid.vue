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
    playerTurn: "player1",
    listPlayerPos: [new Player("player1", 1, 1), new Player("player2", 10, 10)],
    grid: new GridData(),
  }),
  async created() {
    this.grid.GetCellsFromJson();
    this.cells = this.grid.cells;
  },
  methods: {
    clicked(e) {
      const playerIndex = this.listPlayerPos.findIndex(
        (x) => x.id == this.playerTurn
      );
      this.listPlayerPos[playerIndex].setPosition(e.x, e.y);

      const cell = this.grid.cells[e.x][e.y];
      cell.asPlayer = true;

      this.$emit("cell-walkable", []);

      const playersListSize = this.listPlayerPos.length;

      if (playerIndex == playersListSize - 1) {
        this.playerTurn = this.listPlayerPos[0].id;
      } else {
        this.playerTurn = this.listPlayerPos[playerIndex + 1].id;
      }
    },
    playerMove() {
      const player = this.listPlayerPos.find((x) => x.id == this.playerTurn);
      const cells = this.grid.accessibleCellsAround(
        player.posX,
        player.posY,
        5,
        1,
        new Set()
      );
      this.grid.clearCellStep();
      this.$emit("cell-walkable", Array.from(cells));
    },
    attack() {},
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
