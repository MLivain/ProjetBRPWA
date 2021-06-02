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
  }),
  async created() {
    const data = new GridData();
    data.GetCellsFromJson();
    this.cells = data.cells;
    console.log(this.listPlayerPos);
  },
  methods: {
    clicked(e) {
      console.log(e);
      this.listPlayerPos[0].setPosition(e.x, e.y);
      console.log(this.listPlayerPos);
      // TODO: send position via service worker
    },
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
