<template>
  <div>
    <Pagination/>
    <template v-if="!loadingList">
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
import Pagination from "@/components/Pagination";

export default {
  name: "HerosList",
  components: {Pagination},
  computed: {
    ...mapState(['loadingList', 'heroesList']),
    paginationBeforeCurrentPage() {
      return index => (index <= (this.$store.currentPage - 1) && index <= (this.$store.currentPage.currentPage - 1))
    }
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
.pagination {
  color: grey;
}
.current-page {
  font-weight: bold;
  color: black;
}

</style>