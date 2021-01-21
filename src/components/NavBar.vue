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

      <template v-slot:default>
        <h1>I need a hero</h1>
      <v-spacer></v-spacer>

      <LangSelector class="TEST "/>
      </template>

      <template v-slot:extension>
        <v-tabs>
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
  computed: {
    tabs() {
      return [
        {name: this.$t('tabs.dashboard'), path: '/favorites'},
        {name: this.$t('tabs.heroes'), path: '/'},
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
