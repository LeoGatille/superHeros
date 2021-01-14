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
          <router-view style="position: relative; z-index: 1;" :key="$route.fullPath"></router-view>
        </v-container>
      </v-sheet>
      <img class="illustration top"  width="500" src="../public/56cdc0190a6ceabcc36091e25b52d5da.jpg" alt="ALTERNATIVE WIP">
      <img class="illustration bottom" src="../public/rought.jpg" alt="ALTERNATIVE WIP">
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
<style lang="scss" scoped>
.illustration {
  position: fixed;
  opacity: 0.3;
}
.top {
  top: 10px;
  left: 50px;
}
.bottom {
  bottom: -182px;
  right: -235px;
}
</style>