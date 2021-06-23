<template>
  <v-app>
    <v-app-bar app dark>
      <v-toolbar-title>Free For All</v-toolbar-title>

      <ul class="nav navbar-nav">
        <router-link tag="li" active-class="active" to="/" exact
          ><a>Accueil</a></router-link
        >
        <router-link tag="li" active-class="active" to="/game"
          ><a>Jeu</a></router-link
        >
        <router-link tag="li" active-class="active" to="/gamehistory"
          ><a>Historique</a></router-link
        >
      </ul>

      <v-spacer></v-spacer>

      <v-btn
        elevation="2"
        color="secondary"
        to="/login"
        v-if="!this.getLoggedIn"
      >
        Connexion
      </v-btn>
      <v-btn
        elevation="2"
        color="secondary"
        to="/login"
        v-if="this.getLoggedIn"
        v-on:click="this.logout"
      >
        Déconnexion
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  data: () => ({}),
  computed: {
    ...mapGetters("user", ["getLoggedIn", "getCurrentUser"]),
  },
  methods: {
    ...mapActions("user", ["logout"]),
  },
};
</script>
<style scoped>
ul {
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-columns: auto auto auto;
  list-style-type: none;
  list-style: none;
}

ul li {
  margin-left: 10px;
  display: grid;
  justify-content: center;
  align-content: center;
}

a {
  text-decoration: none;
  color: white !important;
}

@media (max-width: 600px) {
  .v-toolbar__title {
    display: none;
  }
}
</style>
