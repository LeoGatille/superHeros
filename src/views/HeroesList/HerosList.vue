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
    <Pagination :current-page="currentPage" @changePage="dispatchChangePage"/>
    </template>
    <template v-else>
      <div>LOADING</div>
    </template>
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
    ...mapState(['loadingList', 'heroesList','pages']),
    getTypeList() {
      return this.typeList ? this.typeList : 'dashboardHeroes';
    },
    currentPage() {
      //? A getter might be nice
      return this.pages[this.getTypeList];
    },
    setFetchAction(){
      const actionArray = this.getTypeList.split('');
      actionArray[0] = actionArray[0].toUpperCase();
      return 'fetch' + actionArray.join('');
    }
  },
  created() {
    this.fetchHeroes();
  },
  methods: {
    ...mapActions(['changePageIndex']),
    fetchHeroes() {
      this.$store.dispatch(this.setFetchAction);
    },
    dispatchChangePage(pageIndex) {
      this.changePageIndex({pageIndex, pageName: this.getTypeList});
      this.fetchHeroes();
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