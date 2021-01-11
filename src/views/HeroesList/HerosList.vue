<template>
  <div>
    <template v-if="!loadingList">
      <div class="card-list" >
        <HeroCard v-for="hero in heroesList" :key="hero.name" :hero="hero"/>
      <h2>
<!--        {{hero.name}}-->
<!--        <v-btn @click="addHero(hero)">ADD</v-btn>-->
      </h2>
      </div>
    </template>
    <template v-else>
      <div>LOADING</div>
    </template>
    <Pagination :current-page="setCurrentPage" @changePage="changePage"/>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';
import Pagination from "@/components/Pagination";
import HeroCard from "@/components/HeroCard";

export default {
  name: "HerosList",
  props: ['typeList'],
  components: {
    Pagination,
    HeroCard
  },
  computed: {
    ...mapState(['loadingList', 'heroesList']),
    setCurrentPage() {
      return this.$store[this.$route.query.listType + 'page'];
    }
  },
  created() {
    this.fetchHeroes();
  },
  methods: {
    ...mapActions(['changePage']),
    fetchHeroes() {
      this.$store.dispatch(`fetch${this.typeList}`);
    },
    addHero(hero) {
      this.$store.dispatch('addOneDashboardHero', hero);
    },
    changePage(shiftValue) {
      //! Redundancy
      this.changePage(shiftValue, this.typeList);
      this.fetchHeroes();

      // if(this.$route.query.listType === 'allHeroes') {
      //   this.$store.dispatch('shiftPage', {shiftValue, page:'allHeroesPage'} );
      //   this.$store.dispatch('fetchAllHeroes');
      // } else if (this.$route.query.listType === 'dashboard') {
      //   this.$store.dispatch('shiftPage', {shiftValue, page:'dashboardPage'});
      //   this.$store.dispatch('fetchDashboardHeroes');
      // }
    },
  }
}
</script>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.pagination {
  color: grey;
}
.current-page {
  font-weight: bold;
  color: black;
}

</style>