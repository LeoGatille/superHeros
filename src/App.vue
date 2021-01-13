<template>
  <v-app>
    <NavBar/>
    <v-main>
      <v-sheet
          id="scrolling-techniques-2"
          class="overflow-y-auto"
      >
        <v-container fluid style="position: relative">
          <ToolBar v-if="showSettings" style="position: fixed; z-index: 100;"/>
          <router-view :key="$route.fullPath"></router-view>
        </v-container>
      </v-sheet>
    </v-main>
  </v-app>
</template>
<script>
import NavBar from "@/components/NavBar";
import ToolBar from "@/components/ToolBar";
import {mapState, mapActions} from "vuex";

export default {
  name: 'App',
  components: {
    NavBar,
    ToolBar,
  },
  computed: {
    ...mapState(['showSettings']),
  },
  created() {
    this.createHeroesLocalStorage();
    this.fetchDashboardHeroes();
  },
  methods: {
    ...mapActions(['createHeroesLocalStorage', "fetchDashboardHeroes"])
  },
};
</script>
