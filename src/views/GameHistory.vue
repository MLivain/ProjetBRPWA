<template>
  <div class="games-container">
    <div>
      <h3>Parties en cours</h3>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in GetUnfinishedGames()" :key="item.name">
              <td>{{ item.name }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div>
      <h3>Parties finies</h3>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Classement de partie</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in GetFinishedGames()" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.position }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameHistory",
  data: () => ({
    //db
    games: [
      { name: "Game1 ", position: 1, done: true },
      { name: "Game2", position: null, done: false },
    ],
  }),

  methods: {
    GetFinishedGames() {
      return this.games.filter((x) => x.done);
    },
    GetUnfinishedGames() {
      return this.games.filter((x) => !x.done);
    },
  },
};
</script>

<style scoped>
.games-container {
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-columns: 80%;
  height: 100%;
}
</style>
