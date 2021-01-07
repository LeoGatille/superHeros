<template>
  <v-app>
    <NavBar/>
    <v-main>
      <v-sheet
          id="scrolling-techniques-2"
          class="overflow-y-auto"
      >
        <v-container fluid style="position: relative">
          <ToolBar v-if="showSettings" style="position: fixed; "/>
          <router-view :key="$route.fullPath"></router-view>
        </v-container>
      </v-sheet>
    </v-main>
  </v-app>
</template>
<script>
import NavBar from "@/components/NavBar";
import ToolBar from "@/components/ToolBar";
import {mapState} from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapState(['showSettings']),
  },
  components: {
    NavBar,
    ToolBar,
  },
  beforeCreate() {
    this.$store.dispatch('createHeroesLocalStorage');
  }
};
</script>
