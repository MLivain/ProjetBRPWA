<template>
  <div class="container-form">
    <div class="form">
      <v-card class="form-card" elevation="2">
        <v-card-title class="title-card"> Free For All </v-card-title>
        <v-card-text>
          <v-text-field label="Username"></v-text-field>
          <v-text-field label="Password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text> Connexion </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
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
