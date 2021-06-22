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
export default {
  name: "CreateOrJoin",
  data: () => ({
    codeParty: null,
  }),
  methods: {
    async createParty() {
      //db => create party
      const party = { Id: 1 };
      await this.$router.push(`game/${party.Id}`);
    },
    async joinParty() {
	    try {
		    const party = null;
		    if (this.codeParty) {
			    //db => join party code
		    } else {
			    //db => join random party
		    }
		    await this.$router.push(`game/${party.Id}`);
	    } catch (e) {
	    	console.error(e);
	    }
    },
},
};
</script>

<style scoped></style>
