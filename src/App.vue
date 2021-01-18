<template>
  <v-app>
    <NavBar/>
    <v-main>
      <NotificationContainer/>
      <v-sheet
          id="scrolling-techniques-2"
          class="overflow-y-auto"
          style="overflow-x: visible"
      >
        <v-container fluid style="position: relative">
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
import {mapState, mapActions} from "vuex";
import NotificationContainer from "@/components/Notifications/NotificationContainer";

export default {
  name: 'App',
  components: {
    NotificationContainer,
    NavBar,
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