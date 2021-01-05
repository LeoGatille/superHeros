<template>
<div>
  <v-app-bar
      app
      fixed
      prominent
      short
      color="#fc2803"
      dark
      shrink-on-scroll
      fade-img-on-scroll
      src="../../public/all_heroes.png"
  >
    <template v-slot:img="{ props }">
      <v-img
          v-bind="props"
          gradient="to top right, rgba(245, 00, 00, 0.7), rgba(252, 165, 3, 0.3)"
      ></v-img>
    </template>


    <v-app-bar-title>I need a hero</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <font-awesome-icon :icon="['fas', 'user-secret']" />
    </v-btn>

    <v-btn icon>
      <font-awesome-icon :icon="['fas', 'search']" />
    </v-btn>
    <template v-slot:extension>
      <v-tabs>
        <v-tab>Dashboard</v-tab>
        <v-tab>Héros</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</div>
</template>

<script>
export default {
name: "NavBar"
}
</script>

<style scoped>
main {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  background-color: #051a3c;
}
</style>
