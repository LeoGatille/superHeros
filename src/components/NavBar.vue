<template>
  <div class="navbar-container">
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

      <LangSelector/>
      <!--    <v-btn icon @click="setSettingsDisplay">-->
      <!--      <font-awesome-icon :icon="['fas', 'cog']" />-->
      <!--    </v-btn>-->

      <template v-slot:extension>
        <v-tabs v-model="selectedTab">
           <v-tab  v-for="tab in tabs" :key="tab.id" :to="tab.path">{{tab.name}}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import LangSelector from '@/components/LangSelector'

export default {
  name: "NavBar",
  components: {
    LangSelector
  },
  data() {
    return {
      selectedTab: 1
    }
  },
  computed: {
    tabs() {
      return [
        {index: 1, name: this.$t('tabs.heroes'), path: '/'},
        {index: 2, name: this.$t('tabs.dashboard'), path: '/favorites'},
      ]
    }
  },
  methods: {

    setSettingsDisplay() {
      this.$store.dispatch('setSettingsDisplay')
    }
  }
}
</script>


<style scoped>
.navbar-container {
  z-index: 99999;
}

main {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  background-color: #051a3c;
}
</style>
