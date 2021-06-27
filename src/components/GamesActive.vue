<template>
  <v-container fluid>
    <v-row v-for="game of getGames" :key="game.id">
      <v-card min-width="100%">
        <v-list-item>
          <v-list-item-title>game {{ game.id }}</v-list-item-title>
          <v-btn @click="joinParty(game.id)">Rejoindre</v-btn>
        </v-list-item>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "GamesActive",
  data: () => ({
    games: [],
  }),
  mounted: function () {
    this.getParties();
  },
  methods: {
    ...mapActions("game", ["getActive"]),
    async getParties() {
      this.games = await this.getActive();
    },
    async joinParty(gameId) {
      await this.$router.push(`/game/${gameId}`);
    },
  },
  computed: {
    getGames() {
      return this.games;
    },
  },
};
</script>

<style scoped></style>
