<template>
  <div>
    <template v-if="!loadingList">
      <div v-for="hero in heroesList" :key="hero">{{hero.name}}</div>
    </template>
    <template v-else>
      <div>LOADING</div>
    </template>

  </div>
</template>

<script>
import { mapState} from 'vuex';

export default {
  name: "HerosList",
  computed: {
    ...mapState(['loadingList', 'heroesList']),
    // ...mapGetters(['getHeroesListByName'])
  },
  created() {
    this.$store.dispatch('getAllHeroes')
  }
}

</script>

<style scoped>

</style>