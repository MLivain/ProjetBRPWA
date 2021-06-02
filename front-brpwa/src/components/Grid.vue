<template>
  <div class="game-container">
    <div class="game-row" v-for="(row, index) in cells" :key="`row-${index}`">
      <cell
        :x="cell.x"
        :y="cell.y"
        :backgroundTile="cell.backgroundTile"
        :obstacleTile="cell.obstacleTile"
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

export default {
  components: { Cell },
  name: "Grid",
  data: () => ({
    cells: [],
  }),
  async created() {
    const data = new GridData();
    data.GetCellsFromJson();
    this.cells = data.cells;
  },
  methods: {
    clicked(e) {
      console.log(e);
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
