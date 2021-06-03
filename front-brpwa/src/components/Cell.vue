<template>
  <div
    class="cell"
    :class="isClickable && !asPlayer ? 'hover' : ''"
    v-on:click="clickCell"
  >
    <div
      class="obstacle"
      v-if="obstacleTile >= 0"
    ></div>
    <div class="player" v-if="asPlayer" ></div>
  </div>
</template>
<script>
export default {
  name: "Cell",
  data : () =>({
    isClickable : false
  }),
  props: {
    backgroundTile: Number,
    x: Number,
    y: Number,
    obstacleTile: Number,
    asPlayer: Boolean,
  },
  created(){
    this.$parent.$on('cell-walkable', this.checkCellWalkable);
  },
  methods: {
    clickCell() {
      if (this.obstacleTile < 0 && this.isClickable) {
        const data = { x: this.x, y: this.y };
        this.$emit("cell-clicked", data);
      }
    },
    checkCellWalkable(cells){
      if(cells.some(cell=> cell.x == this.x && cell.y == this.y) && !this.asPlayer){
        this.isClickable = true;
      }else{
        this.isClickable = false;
      }

    }
  },
};
</script>

<style scoped>
.cell {
  height: 24px;
  width: 24px;
  background-image: url("../assets/TX Tileset Grass.png");
}



.cell .obstacle {
  height: inherit;
  width: inherit;
  background-image: url("../assets/case.png");
  z-index: 2;
}

.hover {
  background: rgba(19, 197, 43, 0.849);
  border: 1px black dotted;
}

.hover:hover{
cursor: pointer;
}

.player {
  background-image: url("../assets/player.png");
  z-index: 2;
  height: inherit;
  width: inherit;
}
</style>
