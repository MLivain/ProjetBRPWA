<template>
  <div class="container-form">
    <div class="form">
      <v-card class="form-card" elevation="2">
        <v-card-title class="title-card"> Free For All </v-card-title>
        <v-card-text>
          <v-text-field label="Username" v-model="email"></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
          ></v-text-field>
        </v-card-text>
        <a href="/register">Vous n'avez pas de compte ?</a>
        <v-card-actions>
          <v-btn text v-on:click="handleSubmit" :disabled="isDisabled">
            Connexion
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    email: null,
    password: null,
  }),
  methods: {
    ...mapActions('user', ['login']),
    async handleSubmit() {
      const result = await this.login({
        email: this.email,
        password: this.password,
      });
      console.log(result);
    },
  },
  computed: {
    isDisabled: function () {
      return (
        !this.email ||
        this.email.length === 0 ||
        !this.password ||
        this.password.length === 0
      );
    },
  },
};
</script>

<style scoped>
.container-form {
  display: grid;
  height: 100%;
  width: 100%;
}

.form {
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-columns: 50%;
}
</style>
