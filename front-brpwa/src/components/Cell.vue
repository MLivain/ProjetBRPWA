<template>
  <div class="cell"  v-on:click="clickCell">

  </div>
</template>
<script>
export default {
  name: "Cell",

  props: {
    backgroundTile: Number,
    x: Number,
    y: Number,
    obstacleTile: Number,
  },
  methods :{
      clickCell(){
          if(!this.obstacle){
             var data = { x : this.x , y : this.y};
             this.$emit('cell-clicked',data);
          }
      }
  }
};
</script>

<style scoped>
.cell {
  height: 24px;
  width: 24px;
}

.cell:hover{
 cursor:pointer;
}
</style>
