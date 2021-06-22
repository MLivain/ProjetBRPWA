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
import { mapActions } from 'vuex';

export default {
  name: "CreateOrJoin",
  data: () => ({
    codeParty: null,
  }),
  methods: {
  	...mapActions('game', ['create', 'join']),
    async createParty() {
	    const party = await this.create();
      await this.$router.push(`game/${party.Id}`);
    },
    async joinParty() {
	    try {
		    const result = await this.join(this.codeParty);
		    await this.$router.push(`game/${result.Id}`);
	    } catch (e) {
	    	console.error(e);
	    }
    },
},
};
</script>

<style scoped></style>
