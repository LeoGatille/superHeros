<template>
  <v-app>
    <NavBar/>
    <v-main>
      <v-sheet
          id="scrolling-techniques-2"
          class="overflow-y-auto"
      >
        <v-container fluid>
          <router-view :key="$route.fullPath"></router-view>
        </v-container>
      </v-sheet>
    </v-main>
  </v-app>
</template>
<script>
import NavBar from "@/components/NavBar";
export default {
  name: 'App',
  components: {
    NavBar,
  },
  beforeCreate() {
    this.$store.dispatch('createHeroesLocalStorage');
  }

};
</script>
