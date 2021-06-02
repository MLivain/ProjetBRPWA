<template>
  <div class="grid-container">
    <grid></grid>
  </div>
</template>
<script>
import Grid from "../components/Grid.vue";

export default {
  components: { Grid },
  name: "Game",
};
</script>
<style scoped>
.grid-container {
  display: grid;
  align-content: center;
  justify-content: center;
  height: 100%;
}
</style>
