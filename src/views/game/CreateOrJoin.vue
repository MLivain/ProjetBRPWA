<template>
  <v-card>
    <v-card-actions>
      <v-container fill-height fluid>
        <v-row align="center" justify="center" class="py-md-3">
          <v-btn @click="createParty">Créer une partie</v-btn>
        </v-row>
        <v-row align="center" justify="center" class="py-md-1">
          <v-text-field
            label="Code"
            v-model="codeParty"
            class="pa-5"
          ></v-text-field>
          <v-btn @click="joinParty" class="pa-5">Rejoindre une partie</v-btn>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions/*, mapGetters*/ } from "vuex";

export default {
  name: "CreateOrJoin",
  data: () => ({
    codeParty: null,
  }),
  methods: {
    ...mapActions("game", ["create", "join"]),
    async createParty() {
      try {
        const game = await this.create();
        await this.join(game.id);
        await this.$router.push(`game/${game.id}`);
      } catch (e) {
        console.error(e);
      }
    },
    async joinParty() {
      try {
        /*if (this.codeParty && this.getGames.includes(this.codeParty)) {
          await this.$router.push(`game/${this.codeParty}`);
        } else {*/
        const game = await this.join(this.codeParty);
        await this.$router.push(`game/${game.game.id}`);
        // }
      } catch (e) {
        console.error(e);
      }
    },
  },/*
  computed: {
    ...mapGetters("game", ["getGames"]),
  },*/
};
</script>

<style scoped></style>
