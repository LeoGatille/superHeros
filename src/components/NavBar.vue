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

<!--    <v-btn icon>-->
<!--      <font-awesome-icon :icon="['fas', 'search']" />-->
<!--    </v-btn>-->
<!--    <SearchBar/>-->
    <v-btn icon >
      <font-awesome-icon :icon="['fas', 'language']" />
    </v-btn>
    <v-btn icon @click="setSettingsDisplay">
      <font-awesome-icon :icon="['fas', 'cog']" />
    </v-btn>

    <template v-slot:extension>
      <v-tabs>
        <router-link :to="{ name: 'heroes-list', query: { listType: 'dashboard' } }">
          <v-tab>{{ $t('tabs.dashboard')}}</v-tab>
        </router-link>
        <router-link :to="{ name: 'heroes-list', query: { listType: 'allHeroes' } }">
          <v-tab>{{ $t('tabs.heroes')}}</v-tab>
        </router-link>
      </v-tabs>
    </template>
<!--      <v-row style="position: relative; height: 100%; width: 100%">-->
<!--      </v-row>-->
  </v-app-bar>
</div>
</template>

<script>

export default {
name: "NavBar",
  methods: {
    setSettingsDisplay() {
      this.$store.dispatch('setSettingsDisplay')
    }
  }
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
