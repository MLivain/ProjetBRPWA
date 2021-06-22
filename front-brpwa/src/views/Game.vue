<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-spacer></v-spacer>
      </v-col>
      <v-col cols="6">
        <grid v-if="this.$route.params.id"></grid>
        <create-or-join v-else></create-or-join>
      </v-col>
      <v-col cols="2">
        <games-active></games-active>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Grid from "./game/Grid.vue";
import CreateOrJoin from "@/views/game/CreateOrJoin";
import GamesActive from "@/components/GamesActive";

export default {
  components: { GamesActive, CreateOrJoin, Grid },
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

player-actions {
  border: 1px black;
}
</style>
