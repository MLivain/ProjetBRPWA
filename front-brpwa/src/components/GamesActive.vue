<template>
  <v-container fluid>
    <v-row v-for="game of games" :key="game.Id">
      <v-card min-width="100%">
        <v-list-item>
          <v-list-item-title
            >{{ game.players[0].user.name }} -
            {{ game.players[1].user.name }}</v-list-item-title
          >
          <v-btn>Rejoindre</v-btn>
        </v-list-item>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "GamesActive",
  data: () => ({
    games: [],
  }),
  async created() {
    //db => call for games 'getUserActiveGames'
    const games = [
      {
        Id: 5,
        players: [{ user: { name: "michel" } }, { user: { name: "marc" } }],
      },
      {
        Id: 12,
        players: [{ user: { name: "michel" } }, { user: { name: "marc" } }],
      },
      {
        Id: 55,
        players: [{ user: { name: "michel" } }, { user: { name: "marc" } }],
      },
    ];
    this.games.push(...games);
  }
};
</script>

<style scoped></style>
