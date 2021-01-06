<template>
  <div>
    <template v-if="!loadingList">
    <!--Might create a pagination component-->
      <span v-for="index in maxPage" :key="index">
        <span >{{index}}</span>
      </span>

      <div v-for="hero in heroesList" :key="hero.name">
      <h2>
        {{hero.name}}
        <v-btn @click="addHero(hero)">ADD</v-btn>
      </h2>
      </div>
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
    ...mapState(['loadingList', 'heroesList', 'currentPage', 'maxPage']),
    // paginationBeforeCurrentPage() {
    //   index <= (currentPage - 1) && index <= (currentPage - 1)
    // }
    // ...mapGetters(['getHeroesListByName'])
  },
  created() {
    if(this.$route.query.listType === 'allHeroes') {
      this.$store.dispatch('fetchAllHeroes')
    } else if (this.$route.query.listType === 'dashboard') {
      this.$store.dispatch('fetchFavoritesHeroes')
    }
  },
  methods: {
    addHero(hero) {
      this.$store.dispatch('addOneFavoriteHero', hero);
    }
  }
}

</script>

<style scoped>

</style>