<template>
  <div>

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
    <Pagination :current-page="setCurrentPage" @changePage="shiftPage"/>
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
    setCurrentPage() {
      return this.$store[this.$route.query.listType + 'page'];
    }
  },
  created() {
    //! Redundancy
    if(this.$route.query.listType === 'allHeroes') {
      this.$store.dispatch('fetchAllHeroes');
      // this.$store.dispatch('setDisplayedList', 'allHeroes')
    } else if (this.$route.query.listType === 'dashboard') {
      this.$store.dispatch('fetchDashboardHeroes');
      // this.$store.dispatch('setDisplayedList', 'allHeroes')
    }
  },
  methods: {
    addHero(hero) {
      this.$store.dispatch('addOneDashboardHero', hero);
    },
    shiftPage(shiftValue) {
      //! Redundancy
      if(this.$route.query.listType === 'allHeroes') {
        this.$store.dispatch('shiftPage', {shiftValue, page:'allHeroesPage'} );
        this.$store.dispatch('fetchAllHeroes');
      } else if (this.$route.query.listType === 'dashboard') {
        this.$store.dispatch('shiftPage', {shiftValue, page:'dashboardPage'});
        this.$store.dispatch('fetchDashboardHeroes');
      }
    },
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